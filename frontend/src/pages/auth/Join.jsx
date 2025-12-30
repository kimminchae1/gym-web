import React, { useState } from "react";
import "./Join.css";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase"; // 경로는 네 폴더 구조에 맞게 수정!

export default function Join() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userEmail: "",
    userPassword: "",
    userName: "",
    userTel: "",
    userGender: "",
    userBirth: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerFailed, setRegisterFailed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const email = form.userEmail.trim();
    const pw = form.userPassword.trim();

    if (!email) return "이메일을 입력해주세요.";
    if (!pw) return "비밀번호를 입력해주세요.";
    if (pw.length < 6) return "비밀번호는 최소 6자 이상이어야 합니다.";
    if (!form.userName.trim()) return "이름을 입력해주세요.";
    if (!form.userTel.trim()) return "전화번호를 입력해주세요.";
    if (!form.userGender.trim()) return "성별을 입력해주세요.";
    if (!form.userBirth) return "생년월일을 선택해주세요.";

    return "";
  };

  const firebaseErrorToKorean = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "이미 가입된 이메일입니다.";
      case "auth/invalid-email":
        return "이메일 형식이 올바르지 않습니다.";
      case "auth/weak-password":
        return "비밀번호가 너무 약합니다. (최소 6자)";
      case "auth/network-request-failed":
        return "네트워크 오류입니다. 인터넷 연결을 확인해주세요.";
      default:
        return "회원가입에 실패했습니다. 다시 시도해주세요.";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setRegisterSuccess(false);
    setRegisterFailed(false);
    setErrorMsg("");

    const msg = validate();
    if (msg) {
      alert(msg);
      return;
    }

    try {
      setSubmitting(true);

      // 1) Firebase Auth에 계정 생성
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.userEmail.trim(),
        form.userPassword.trim()
      );

      const uid = cred.user.uid;

      // 2) Firestore에 프로필 저장 (비밀번호 저장 금지!)
      await setDoc(doc(db, "users", uid), {
        userEmail: form.userEmail.trim(),
        userName: form.userName.trim(),
        userTel: form.userTel.trim(),
        userGender: form.userGender.trim(),
        userBirth: form.userBirth, // "YYYY-MM-DD"
        createdAt: serverTimestamp(),
      });

      setRegisterSuccess(true);

      // 성공 후 로그인 페이지로 이동 (원하면 delay 가능)
      setTimeout(() => {
        navigate("/login"); // 네 라우터에 맞게 수정
      }, 800);
    } catch (err) {
      console.error(err);
      setRegisterFailed(true);
      const code = err?.code;
      setErrorMsg(firebaseErrorToKorean(code));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="joinPage">
      <div className="wrapper">
        <div className="joinHeader">
          <h1>일산 탄현점에 오신 것을 환영합니다</h1>
        </div>

        <div className="joinContainer">
          <div className="joinSection">
            <h1 className="joinTitle">회원가입</h1>

            <form onSubmit={onSubmit} className="joinForm">
              <label className="joinLabel">
                이메일 :
                <input
                  type="email"
                  name="userEmail"
                  value={form.userEmail}
                  onChange={onChange}
                  placeholder="example@example.com"
                  required
                  className="joinInput"
                />
              </label>

              <label className="joinLabel">
                비밀번호 :
                <input
                  type="password"
                  name="userPassword"
                  value={form.userPassword}
                  onChange={onChange}
                  placeholder="password"
                  required
                  className="joinInput"
                />
              </label>

              <label className="joinLabel">
                이름 :
                <input
                  type="text"
                  name="userName"
                  value={form.userName}
                  onChange={onChange}
                  placeholder="이름"
                  required
                  className="joinInput"
                />
              </label>

              <label className="joinLabel">
                전화번호 :
                <input
                  type="text"
                  name="userTel"
                  value={form.userTel}
                  onChange={onChange}
                  placeholder="010-1234-5678"
                  required
                  className="joinInput"
                />
              </label>

              <label className="joinLabel">
                성별 :
                <input
                  type="text"
                  name="userGender"
                  value={form.userGender}
                  onChange={onChange}
                  placeholder="남자/여자"
                  required
                  className="joinInput"
                />
              </label>

              <label className="joinLabel">
                생년월일 :
                <input
                  type="date"
                  name="userBirth"
                  value={form.userBirth}
                  onChange={onChange}
                  required
                  className="joinInput"
                />
              </label>

              <button
                type="submit"
                className="joinBtn"
                disabled={submitting}
              >
                {submitting ? "회원가입 중..." : "회원가입"}
              </button>

              {registerSuccess && (
                <div className="alertSuccess" role="alert">
                  ✅ 회원가입에 성공하셨습니다! 로그인해주세요.
                </div>
              )}

              {registerFailed && (
                <div className="alertDanger" role="alert">
                  ❌ {errorMsg || "회원가입에 실패하셨습니다. 다시 시도해주세요."}
                </div>
              )}
            </form>

            <Link to="/login" className="joinLink">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
