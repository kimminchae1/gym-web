import { useEffect, useRef } from "react";
import PageLayout from "../../components/layout/PageLayout";
import "./Location.css";

const Location = () => {
  const mapRef = useRef(null);
  const kakaoMapRef = useRef(null);

  const gym = {
    name: "짐 케어 헬스&PT",
    branch: "일산 탄현점",
    address: "경기도 고양시 일산서구 탄현동 123-45",
    phone: "031-1234-5678",
    hoursWeekday: "06:00-23:00",
    hoursWeekend: "08:00-22:00",
    subway: "지하철 3호선 탄현역 2번 출구\n도보 5분",
    lat: 37.69331,
    lng: 126.763663,
    kakaoSearchKeyword: "짐케어 일산 탄현점",
  };

  useEffect(() => {
    const KAKAO_APP_KEY = "dea34e3615810bf2fa4e74754c5f47a8"; // ✅ JS 키

    const initMap = () => {
      if (!mapRef.current) return;

      const center = new window.kakao.maps.LatLng(gym.lat, gym.lng);

      const map = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 3,
      });
      kakaoMapRef.current = map;

      const marker = new window.kakao.maps.Marker({ position: center });
      marker.setMap(map);

      const iwContent = `
        <div style="padding:5px; font-size:12px; width:200px;">
          <strong>🏋️‍♂️ ${gym.name}</strong><br/>
          ${gym.branch}<br/>
          📞 ${gym.phone}<br/>
          🕐 ${gym.hoursWeekday}
        </div>
      `;

      const infowindow = new window.kakao.maps.InfoWindow({ content: iwContent });
      infowindow.open(map, marker);

      window.kakao.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });

      // ✅ 화면 렌더 후 안정화
      setTimeout(() => {
        map.relayout();
        map.setCenter(center);
      }, 0);
    };

    const run = () => {
      if (!window.kakao?.maps?.load) return;
      window.kakao.maps.load(initMap);
    };

    // 이미 로드된 경우
    if (window.kakao?.maps?.load) {
      run();
    } else {
      // 이미 script 있으면 그거 재사용
      const exist = document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]');
      if (exist) {
        exist.addEventListener("load", run);
      } else {
        const script = document.createElement("script");
        script.async = true;
        script.dataset.kakao = "true";
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
        script.onload = run;
        script.onerror = () => console.error("kakao sdk load failed");
        document.head.appendChild(script);
      }
    }

    const onResize = () => {
      if (kakaoMapRef.current) kakaoMapRef.current.relayout();
    };
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openKakaoMap = () => {
    const url = `https://map.kakao.com/link/search/${encodeURIComponent(
      gym.kakaoSearchKeyword
    )}`;
    window.open(url, "_blank");
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(gym.address);
      alert(`주소가 클립보드에 복사되었습니다!\n${gym.address}`);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = gym.address;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert(`주소가 클립보드에 복사되었습니다!\n${gym.address}`);
    }
  };

  return (
    <PageLayout>
      <div className="gl-wrapper">
        <div className="gl-page-header">
          <h1>헬스장 위치</h1>
          <p>일산 탄현점 찾아오시는 길</p>
        </div>

        <div className="gl-container">
          {/* 지도 */}
          <div ref={mapRef} className="gl-map" />

          {/* 헬스장 정보 */}
          <div className="gl-gym-info">
            <h3>
              🏋️‍♂️ {gym.name} {gym.branch}
            </h3>

            <div className="gl-info-grid">
              <div className="gl-info-item">
                <strong>📍 주소</strong>
                <p>{gym.address}</p>
              </div>

              <div className="gl-info-item">
                <strong>📞 전화</strong>
                <p>{gym.phone}</p>
              </div>

              <div className="gl-info-item">
                <strong>🕐 운영시간</strong>
                <p>
                  평일: {gym.hoursWeekday}
                  <br />
                  주말: {gym.hoursWeekend}
                </p>
              </div>

              <div className="gl-info-item">
                <strong>🚇 대중교통</strong>
                <p className="gl-preline">{gym.subway}</p>
              </div>
            </div>
          </div>

          {/* 오시는 길 */}
          <div className="gl-directions">
            <h4>🚗 자가용 이용시</h4>
            <ul>
              <li>자유로 → 일산IC → 중앙로 → 탄현동</li>
              <li>주차장: 건물 지하 1-2층 (2시간 무료)</li>
            </ul>

            <h4>🚌 대중교통 이용시</h4>
            <ul>
              <li>지하철 3호선 탄현역 하차 → 2번 출구 → 도보 5분</li>
              <li>버스: 1000번, 1200번, 1300번 → 탄현동 정류장 하차</li>
            </ul>
          </div>

          {/* 버튼 */}
          <div className="gl-action-buttons">
            <button onClick={openKakaoMap} className="btn btn-primary gl-btn">
              카카오맵에서 보기
            </button>
            <button onClick={copyAddress} className="btn btn-secondary gl-btn">
              주소 복사
            </button>

            {/* ✅ 라우터 쓰면 navigate("/")로 바꾸는 게 베스트 */}
            <button
              onClick={() => (window.location.href = "/")}
              className="btn btn-outline-primary gl-btn"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Location;
