import React, { useEffect, useMemo, useState } from "react";
import "./PostList.css";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * PostList.jsx (사실상 "게시물 상세" 페이지)
 * - URL 예: /post?poId=123
 *
 * 필요한 API(예시)
 * 1) 게시물 상세: GET /post/detail?poId=123   (※ 너 프로젝트에 맞게 수정)
 * 2) 좋아요:     POST /post/like             (form: poId)
 * 3) 싫어요:     POST /post/dislike          (form: poId)
 * 4) 댓글 목록:  GET  /list?poId=123
 * 5) 댓글 등록:  POST /write                 (json: { poId, cmContent })
 * 6) 댓글 삭제:  POST /deletePostComment     (form: cmId)
 *
 * loginUserName 은 세션 대신, props or localStorage 등으로 받아오면 됨.
 */
export default function PostList({ loginUserName: loginUserNameProp }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const poId = useMemo(() => params.get("poId"), [params]);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  // 로그인 유저명: props 우선, 없으면 localStorage 예시
  const loginUserName = useMemo(() => {
    return loginUserNameProp ?? localStorage.getItem("loginUserName") ?? "";
  }, [loginUserNameProp]);

  // ---------- 공통 fetch helpers ----------
  const postForm = async (url, formObj) => {
    const form = new URLSearchParams();
    Object.entries(formObj).forEach(([k, v]) => form.append(k, v));

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: form.toString(),
      credentials: "include",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // 좋아요/싫어요는 { newCount: number } 라고 가정
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return res.json();
    return res.text();
  };

  const postJson = async (url, bodyObj) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(bodyObj),
      credentials: "include",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return res.json();
    return res.text();
  };

  const getJson = async (url) => {
    const res = await fetch(url, { credentials: "include" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  // ---------- 데이터 로딩 ----------
  const loadPost = async () => {
    if (!poId) return;
    setLoading(true);
    try {
      // ⚠️ 여기를 너 프로젝트의 "게시물 상세" API로 바꿔줘
      // 예: /post/detail?poId=123
      const data = await getJson(`/post/detail?poId=${poId}`);

      setPost(data);
      setLikeCount(data.poLike ?? 0);
      setDislikeCount(data.poDislike ?? 0);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    if (!poId) return;
    const list = await getJson(`/list?poId=${poId}`);
    setComments(Array.isArray(list) ? list : []);
  };

  useEffect(() => {
    (async () => {
      try {
        await loadPost();
        await loadComments();
      } catch (e) {
        console.error(e);
        alert("데이터 로딩 실패 - 운영자에게 문의해주세요.");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poId]);

  // ---------- 이벤트 ----------
  const onClickEdit = () => {
    if (!post) return;
    // 기존: /postEditPage.do?poId=...&authorName=...
    // 라우터 구조에 맞게 유지하거나 변경
    navigate(`/postEditPage.do?poId=${post.poId}&authorName=${encodeURIComponent(post.authorName ?? "")}`);
  };

  const onClickLike = async (e) => {
    e.preventDefault();
    if (!post) return;
    try {
      const res = await postForm("/post/like", { poId: post.poId });
      if (res && typeof res === "object" && "newCount" in res) setLikeCount(res.newCount);
    } catch (err) {
      console.error(err);
      alert("좋아요 처리 오류 - 운영자에게 문의해주세요.");
    }
  };

  const onClickDislike = async (e) => {
    e.preventDefault();
    if (!post) return;
    try {
      const res = await postForm("/post/dislike", { poId: post.poId });
      if (res && typeof res === "object" && "newCount" in res) setDislikeCount(res.newCount);
    } catch (err) {
      console.error(err);
      alert("싫어요 처리 오류 - 운영자에게 문의해주세요.");
    }
  };

  const onSubmitComment = async () => {
    const content = commentContent.trim();
    if (!content) {
      alert("댓글을 입력하세요!");
      return;
    }
    if (!poId) return;

    try {
      await postJson("/write", { poId: Number(poId), cmContent: content });
      setCommentContent("");
      await loadComments();
    } catch (err) {
      console.error(err);
      alert("댓글 작성 오류 - 운영자에게 문의하세요.");
    }
  };

  const onDeleteComment = async (cmId) => {
    if (!cmId) return;
    if (!window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) return;

    try {
      await postForm("/deletePostComment", { cmId });
      await loadComments();
    } catch (err) {
      console.error(err);
      alert("댓글 삭제 오류 - 운영자에게 문의하세요");
    }
  };

  // ---------- 렌더 ----------
  if (loading) {
    return (
      <div className="postDetailPage">
        <div className="postContainer">
          <div className="postCard">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="postDetailPage">
        <div className="postContainer">
          <div className="postCard">게시물을 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  const formattedDate = post.poTime
    ? new Date(post.poTime).toISOString().slice(0, 10)
    : "";

  return (
    <div className="postDetailPage">
      <div className="postContainer">
        <article className="postCard">
          <h1 className="postTitle">{post.poName}</h1>

          <div className="postMeta">
            <span className="metaItem">
              작성자: <span className="metaStrong">{post.authorName}</span>
            </span>

            <span className="metaItem">
              태그: <span className="badgeLike">{post.poTag}</span>
            </span>

            <span className="metaItem">
              작성일: <span className="badgeLike">{formattedDate}</span>
            </span>
          </div>

          <hr className="divider" />

          {post.poImg ? (
            <div className="postImageWrap">
              {/* 기존: /uploads/{poImg} */}
              <img
                src={`/uploads/${post.poImg}`}
                className="postImage"
                alt="Post"
              />
            </div>
          ) : null}

          <div className="postContent">{post.poContent}</div>

          <hr className="divider" />

          <div className="postFooter">
            <div className="postStats">
              <a href="#like" className="statBtn" onClick={onClickLike} title="좋아요">
                <i className="bi bi-hand-thumbs-up-fill" />
                <span className="statNum">{likeCount}</span>
              </a>

              <a href="#dislike" className="statBtn" onClick={onClickDislike} title="싫어요">
                <i className="bi bi-hand-thumbs-down-fill" />
                <span className="statNum">{dislikeCount}</span>
              </a>

              <span className="statView" title="조회수">
                <i className="bi bi-eye-fill" />
                <span className="statNum">{post.poView}</span>
              </span>
            </div>

            <div>
              <button className="btnPrimary" onClick={onClickEdit}>
                <i className="bi bi-pencil-square" /> 수정
              </button>
            </div>
          </div>
        </article>

        <section className="commentSection">
          <h3 className="commentTitle">댓글</h3>

          <div className="commentList">
            {comments.length === 0 ? (
              <p className="commentEmpty">첫 댓글을 남겨보세요!</p>
            ) : (
              comments.map((vo) => {
                const canDelete =
                  loginUserName && vo.authorName === loginUserName;

                return (
                  <div className="commentItem" key={vo.cmId}>
                    <div className="commentHeader">
                      <div className="commentWho">
                        <span className="commentAuthor">{vo.authorName}</span>
                        <span className="commentTime">{vo.cmTime}</span>
                      </div>

                      {canDelete ? (
                        <button
                          className="btnDangerOutline"
                          onClick={() => onDeleteComment(vo.cmId)}
                        >
                          삭제
                        </button>
                      ) : null}
                    </div>

                    <p className="commentBody">{vo.cmContent}</p>
                  </div>
                );
              })
            )}
          </div>

          <div className="commentWrite">
            <textarea
              className="commentTextarea"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <button className="btnPrimary" onClick={onSubmitComment}>
              등록
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
