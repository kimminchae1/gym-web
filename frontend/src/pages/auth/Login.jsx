import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // 경로는 너 폴더에 맞게!

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({ userEmail: "", userPassword: "" });
  const [loginFailed, setLoginFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("block") === "true") alert("로그인 후 이용해주세요");
  }, [location.search]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginFailed(false);

    const email = form.userEmail.trim();
    const pw = form.userPassword.trim();

    if (!email || !pw) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setSubmitting(true);

      // ✅ Firebase Auth 로그인
      const userCredential = await signInWithEmailAndPassword(auth, email, pw);

      // 필요하면 uid 사용 가능
      // console.log("uid:", userCredential.user.uid);

      navigate("/"); // 로그인 성공 후 이동
    } catch (err) {
      console.error(err);
      setLoginFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="loginPage">
      <div className="wrapper">
        <div className="loginHeader">
          <h1>일산 탄현점에 오신 것을 환영합니다</h1>
        </div>

        <div className="loginContainer">
          <div className="loginSection">
            <h1 className="loginTitle">로그인</h1>

            <form onSubmit={onSubmit} className="loginForm">
              <label className="loginLabel">
                아이디 :
                <input
                  type="email"
                  name="userEmail"
                  value={form.userEmail}
                  onChange={onChange}
                  placeholder="example@example.com"
                  className="loginInput"
                />
              </label>

              <label className="loginLabel">
                비밀번호 :
                <input
                  type="password"
                  name="userPassword"
                  value={form.userPassword}
                  onChange={onChange}
                  placeholder="password"
                  className="loginInput"
                />
              </label>

              <button type="submit" className="loginBtn" disabled={submitting}>
                {submitting ? "로그인 중..." : "로그인"}
              </button>

              {loginFailed && (
                <div className="loginFailAlert" role="alert">
                  ❌ 로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.
                </div>
              )}
            </form>

            <Link to="/join" className="registerLink">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
