/**
 * game.js - 신선 특공대 : 스피드 컨베이어 선별 레이스 컨트롤러
 * [개선] 구역 내 식품 무작위 셔플 출현 & 반응 시간 기반 스피드 보너스 차등 점수 시스템
 */

class SupermarketSpeedConveyorGame {
  constructor() {
    this.state = {
      stage: "intro", // intro, belt, cert, result
      freshnessHp: 100,
      totalScore: 0,
      combo: 0,
      maxCombo: 0,
      cart: [],
      reactionTimes: [],
      // 구역 및 셔플된 상품
      currentZoneIndex: 0,
      currentItemIndex: 0,
      zoneItems: [],
      // 드래그 상태
      isDragging: false,
      startX: 0,
      translateX: 0,
      // 인증 마크 매칭 상태
      selectedMark: null,
      selectedDesc: null,
      matchedCertCount: 0
    };

    this.itemAppearTime = 0;
    this.timerInterval = null;

    this.initDOMElements();
    this.bindEvents();
    this.bindCardDrag();
  }

  initDOMElements() {
    this.views = {
      intro: document.getElementById("view-intro"),
      belt: document.getElementById("view-belt"),
      cert: document.getElementById("view-cert"),
      result: document.getElementById("view-result"),
      zoneModal: document.getElementById("modal-zone-alert"),
      feedbackModal: document.getElementById("modal-feedback"),
      textbookModal: document.getElementById("modal-textbook-detail")
    };

    this.hpBar = document.getElementById("hp-bar");
    this.hpText = document.getElementById("hp-text");
    this.hudScoreText = document.getElementById("hud-score-text");
    this.comboBadge = document.getElementById("combo-badge");
    this.comboCountText = document.getElementById("combo-count");
    this.cartCountBadge = document.getElementById("cart-count");

    // 벨트 뷰 요소
    this.productCard = document.getElementById("inspect-product-card");
    this.cardItemName = document.getElementById("card-item-name");
    this.cardItemClue = document.getElementById("card-item-clue");
    this.cardVisualBox = document.getElementById("card-visual-box");
    this.cardSpeedMeter = document.getElementById("card-speed-meter");
    this.dropzoneTrash = document.getElementById("dropzone-trash");
    this.dropzoneCart = document.getElementById("dropzone-cart");
    this.comboOverlay = document.getElementById("combo-burst-overlay");

    // 구역 배너
    this.zoneStepBadge = document.getElementById("zone-step-badge");
    this.zoneProgressBadge = document.getElementById("zone-progress-badge");
    this.zoneName = document.getElementById("zone-name");
    this.zoneOrderRule = document.getElementById("zone-order-rule");
  }

  bindEvents() {
    // 인트로 시작 버튼
    document.getElementById("btn-start-game").addEventListener("click", () => {
      Sound.playClick();
      this.switchStage("belt");
    });

    // 소리 켜기/끄기
    const soundToggle = document.getElementById("btn-toggle-sound");
    if (soundToggle) {
      soundToggle.addEventListener("click", () => {
        Sound.isMuted = !Sound.isMuted;
        soundToggle.textContent = Sound.isMuted ? "🔇 음소거" : "🔊 소리";
      });
    }

    // 하단 쾌속 스와이프 버튼
    document.getElementById("btn-swipe-left").addEventListener("click", () => {
      this.triggerSwipe("left");
    });

    document.getElementById("btn-swipe-right").addEventListener("click", () => {
      this.triggerSwipe("right");
    });

    // 키보드 ◀ ▶ 방향키 지원
    window.addEventListener("keydown", (e) => {
      if (this.state.stage !== "belt") return;
      if (!this.views.feedbackModal.classList.contains("hidden")) return;
      if (!this.views.zoneModal.classList.contains("hidden")) return;

      if (e.key === "ArrowLeft") {
        this.triggerSwipe("left");
      } else if (e.key === "ArrowRight") {
        this.triggerSwipe("right");
      }
    });

    // 구역 전환 모달 닫기
    document.getElementById("btn-zone-continue").addEventListener("click", () => {
      Sound.playClick();
      this.views.zoneModal.classList.add("hidden");
      this.startItemTimer();
    });

    // 피드백 모달 닫기
    document.getElementById("btn-feedback-continue").addEventListener("click", () => {
      Sound.playClick();
      this.views.feedbackModal.classList.add("hidden");
      this.startItemTimer();
    });

    // 교과서 감별 기준 상세 모달 닫기
    const btnCloseTb = document.getElementById("btn-close-textbook-modal");
    if (btnCloseTb) {
      btnCloseTb.addEventListener("click", () => {
        Sound.playClick();
        this.closeTextbookDetailModal();
      });
    }

    const tbModalBackdrop = document.getElementById("modal-textbook-detail");
    if (tbModalBackdrop) {
      tbModalBackdrop.addEventListener("click", (e) => {
        if (e.target === tbModalBackdrop) {
          Sound.playClick();
          this.closeTextbookDetailModal();
        }
      });
    }

    // 다시 시작
    document.getElementById("btn-restart-game").addEventListener("click", () => {
      Sound.playClick();
      this.resetGame();
    });
  }

  // 화면 전환
  switchStage(targetStage) {
    this.state.stage = targetStage;
    Object.values(this.views).forEach(v => {
      if (v) v.classList.add("hidden");
    });

    if (targetStage === "intro") {
      this.views.intro.classList.remove("hidden");
    } else if (targetStage === "belt") {
      this.views.belt.classList.remove("hidden");
      this.initCurrentZone();
      this.renderCurrentBeltItem();
    } else if (targetStage === "cert") {
      this.stopItemTimer();
      this.views.cert.classList.remove("hidden");
      this.renderCertMatching();
    } else if (targetStage === "result") {
      this.stopItemTimer();
      this.views.result.classList.remove("hidden");
      this.renderResultReceipt();
    }

    this.updateHUD();
  }

  updateHUD() {
    this.hpBar.style.width = `${Math.max(0, this.state.freshnessHp)}%`;
    this.hpText.textContent = `${this.state.freshnessHp}%`;

    if (this.state.freshnessHp > 60) {
      this.hpBar.className = "hp-bar-fill hp-healthy";
    } else if (this.state.freshnessHp > 30) {
      this.hpBar.className = "hp-bar-fill hp-warning";
    } else {
      this.hpBar.className = "hp-bar-fill hp-danger";
    }

    this.hudScoreText.textContent = this.state.totalScore.toLocaleString();

    if (this.state.combo >= 2) {
      this.comboBadge.classList.remove("hidden");
      this.comboCountText.textContent = this.state.combo;
    } else {
      this.comboBadge.classList.add("hidden");
    }

    this.cartCountBadge.textContent = this.state.cart.length;
  }

  damageHp(amount = 15, reason = "") {
    this.state.freshnessHp = Math.max(0, this.state.freshnessHp - amount);
    this.state.combo = 0;
    this.state.totalScore = Math.max(0, this.state.totalScore - 40);
    this.updateHUD();
    Sound.playDangerAlarm();

    document.body.classList.add("shake-screen");
    setTimeout(() => document.body.classList.remove("shake-screen"), 400);

    if (reason) {
      this.showToast(`🚨 ${reason} (-${amount}%)`, "danger");
    }
  }

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => toast.remove(), 400);
    }, 2400);
  }

  /* ========================================================
   * 컨베이어 벨트 선별 스테이션
   * ======================================================== */
  getCurrentZone() {
    return GAME_DATA.zones[this.state.currentZoneIndex];
  }

  // 🎲 구역 진입 시 아이템 무작위 셔플 (패턴 방지!)
  initCurrentZone() {
    const zone = this.getCurrentZone();
    if (!zone) return;
    // Fisher-Yates shuffle
    const shuffled = [...zone.items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.state.zoneItems = shuffled;
    this.state.currentItemIndex = 0;
  }

  getCurrentItem() {
    return this.state.zoneItems[this.state.currentItemIndex];
  }

  renderCurrentBeltItem() {
    const zone = this.getCurrentZone();
    if (!zone) {
      Sound.playFanfare();
      this.switchStage("cert");
      return;
    }

    const item = this.getCurrentItem();
    if (!item) {
      // 해당 구역 완료 -> 다음 구역으로 전환!
      this.state.currentZoneIndex++;
      const nextZone = this.getCurrentZone();
      if (nextZone) {
        this.initCurrentZone();
        this.showZoneAlertModal(nextZone);
        this.renderCurrentBeltItem();
      } else {
        Sound.playFanfare();
        this.switchStage("cert");
      }
      return;
    }

    // 구역 배너 갱신
    this.zoneStepBadge.textContent = `${zone.stepNum}단계 구역`;
    this.zoneProgressBadge.textContent = `${this.state.currentItemIndex + 1} / ${this.state.zoneItems.length}`;
    this.zoneName.textContent = `${zone.icon} ${zone.name}`;
    this.zoneOrderRule.textContent = zone.orderRule;

    // 상품 카드 갱신
    this.cardItemName.textContent = item.name;
    this.cardVisualBox.innerHTML = VisualAssets.getGraphic(item.visualType);
    if (this.cardItemClue) {
      this.cardItemClue.textContent = item.clue || "";
    }

    this.resetCardPosition();
    this.startItemTimer();
  }

  // ⏱️ 스피드 타이머 시작
  startItemTimer() {
    this.stopItemTimer();
    this.itemAppearTime = performance.now();
    this.cardSpeedMeter.textContent = "⏱️ 0.0s";
    this.cardSpeedMeter.style.color = "#10b981";

    this.timerInterval = setInterval(() => {
      const elapsedSec = (performance.now() - this.itemAppearTime) / 1000;
      this.cardSpeedMeter.textContent = `⏱️ ${elapsedSec.toFixed(1)}s`;

      if (elapsedSec < 1.0) {
        this.cardSpeedMeter.style.color = "#10b981"; // 초록
      } else if (elapsedSec < 2.0) {
        this.cardSpeedMeter.style.color = "#d97706"; // 주황
      } else {
        this.cardSpeedMeter.style.color = "#ef4444"; // 빨강
      }
    }, 100);
  }

  stopItemTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  showZoneAlertModal(zone) {
    this.stopItemTimer();
    Sound.playFanfare();
    document.getElementById("zone-modal-icon").textContent = zone.icon;
    document.getElementById("zone-modal-title").textContent = `🛒 ${zone.name} 진입!`;
    document.getElementById("zone-modal-rule").textContent = zone.orderRule;
    this.views.zoneModal.classList.remove("hidden");
  }

  // 드래그 앤 드롭 바인딩
  bindCardDrag() {
    const card = this.productCard;

    const startDrag = (clientX) => {
      if (this.state.stage !== "belt") return;
      this.state.isDragging = true;
      this.state.startX = clientX;
      card.style.transition = "none";
      Sound.playInspect();
    };

    const moveDrag = (clientX) => {
      if (!this.state.isDragging) return;
      const deltaX = clientX - this.state.startX;
      this.state.translateX = deltaX;

      const rotate = deltaX * 0.08;
      card.style.transform = `translateX(${deltaX}px) rotate(${rotate}deg)`;

      if (deltaX < -50) {
        card.classList.add("dragging-left");
        card.classList.remove("dragging-right");
        this.dropzoneTrash.classList.add("drag-over");
        this.dropzoneCart.classList.remove("drag-over");
      } else if (deltaX > 50) {
        card.classList.add("dragging-right");
        card.classList.remove("dragging-left");
        this.dropzoneCart.classList.add("drag-over");
        this.dropzoneTrash.classList.remove("drag-over");
      } else {
        card.classList.remove("dragging-left", "dragging-right");
        this.dropzoneTrash.classList.remove("drag-over");
        this.dropzoneCart.classList.remove("drag-over");
      }
    };

    const endDrag = () => {
      if (!this.state.isDragging) return;
      this.state.isDragging = false;
      this.dropzoneTrash.classList.remove("drag-over");
      this.dropzoneCart.classList.remove("drag-over");

      const threshold = 85;
      if (this.state.translateX <= -threshold) {
        this.handleDecision(false, "left");
      } else if (this.state.translateX >= threshold) {
        this.handleDecision(true, "right");
      } else {
        this.resetCardPosition(true);
      }
    };

    card.addEventListener("mousedown", (e) => startDrag(e.clientX));
    window.addEventListener("mousemove", (e) => moveDrag(e.clientX));
    window.addEventListener("mouseup", endDrag);

    card.addEventListener("touchstart", (e) => {
      if (e.touches.length > 0) startDrag(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) moveDrag(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener("touchend", endDrag);
  }

  resetCardPosition(withTransition = false) {
    const card = this.productCard;
    if (withTransition) {
      card.style.transition = "transform 0.25s ease";
    } else {
      card.style.transition = "none";
    }
    card.style.transform = "translateX(0px) rotate(0deg)";
    card.classList.remove("dragging-left", "dragging-right");
    this.state.translateX = 0;
  }

  triggerSwipe(direction) {
    if (this.state.isDragging) return;
    const isFreshPick = direction === "right";
    this.handleDecision(isFreshPick, direction);
  }

  // ⚡ 판정 및 반응 속도 기반 스피드 보너스 차등 점수 계산
  handleDecision(userSaysFresh, direction) {
    const item = this.getCurrentItem();
    if (!item) return;

    this.stopItemTimer();
    const elapsedSec = Math.max(0.2, (performance.now() - this.itemAppearTime) / 1000);
    this.state.reactionTimes.push(elapsedSec);

    Sound.playSwipe();

    if (item.isFresh === userSaysFresh) {
      // ✅ 올바른 판정!
      this.state.combo++;
      if (this.state.combo > this.state.maxCombo) {
        this.state.maxCombo = this.state.combo;
      }

      // 스피드 보너스 차등 산정
      let speedBonus = 0;
      let speedGrade = "GOOD";

      if (elapsedSec < 0.9) {
        speedBonus = 60;
        speedGrade = "⚡ LIGHTNING!";
      } else if (elapsedSec < 1.8) {
        speedBonus = 35;
        speedGrade = "🚀 FAST!";
      } else if (elapsedSec < 3.2) {
        speedBonus = 15;
        speedGrade = "👍 NORMAL";
      } else {
        speedBonus = 5;
        speedGrade = "🐢 CAREFUL";
      }

      // 점수 = (기본 100점 + 스피드보너스) * (1 + 콤보*15%)
      const comboMultiplier = 1 + (this.state.combo - 1) * 0.15;
      const earnedScore = Math.round((100 + speedBonus) * comboMultiplier);
      this.state.totalScore += earnedScore;

      // 신선도 HP 소폭 회복 (+4%)
      this.state.freshnessHp = Math.min(100, this.state.freshnessHp + 4);

      if (userSaysFresh) {
        Sound.playCartSuccess();
        this.state.cart.push(item);
      } else {
        Sound.playTrash();
      }

      this.updateHUD();

      // 카드가 슉 날아가는 연출
      const card = this.productCard;
      const flyX = direction === "left" ? -400 : 400;
      card.style.transition = "transform 0.22s ease, opacity 0.22s ease";
      card.style.transform = `translateX(${flyX}px) rotate(${direction === "left" ? -25 : 25}deg)`;
      card.style.opacity = "0";

      // 스피드 & 콤보 팝업 시각 연출
      Sound.playComboBurst(this.state.combo);
      this.triggerSpeedBurst(speedGrade, elapsedSec, earnedScore);

      this.showToast(`✨ [${item.name}] +${earnedScore}점! (${elapsedSec.toFixed(2)}초)`, "success");

      setTimeout(() => {
        card.style.opacity = "1";
        this.state.currentItemIndex++;
        this.renderCurrentBeltItem();
      }, 240);

    } else {
      // ❌ 오답 판정!
      this.damageHp(15, item.dangerReason);
      this.resetCardPosition(true);

      this.showFeedbackModal({
        title: "🚨 판정 오류! 결함 포착 실패",
        content: `
          <div class="danger-box">
            <p><strong>[식품명]</strong> ${item.name}</p>
            <p style="margin-top: 4px; color: #b91c1c;"><strong>${item.dangerReason}</strong></p>
          </div>
          <p style="font-size: 13.5px; color: #475569; margin-top: 6px;">💡 ${item.explanation}</p>
        `
      });
    }
  }

  // 스피드 버스트 시각 연출
  triggerSpeedBurst(grade, sec, score) {
    this.comboOverlay.innerHTML = `${grade} <span style="font-size: 20px;">(${sec.toFixed(2)}s)</span> +${score}`;
    this.comboOverlay.classList.remove("hidden");
    setTimeout(() => {
      this.comboOverlay.classList.add("hidden");
    }, 600);
  }

  showFeedbackModal({ title, content }) {
    this.stopItemTimer();
    document.getElementById("feedback-title").textContent = title;
    document.getElementById("feedback-body").innerHTML = content;
    this.views.feedbackModal.classList.remove("hidden");
  }

  /* ========================================================
   * 2. 8대 품질 인증 마크 스피드 매칭
   * ======================================================== */
  renderCertMatching() {
    this.state.selectedMark = null;
    this.state.selectedDesc = null;
    this.state.matchedCertCount = 0;

    const marksCol = document.getElementById("cert-marks-col");
    const descsCol = document.getElementById("cert-descs-col");
    marksCol.innerHTML = "";
    descsCol.innerHTML = "";

    const certs = GAME_DATA.certMarks;
    const shuffledMarks = [...certs].sort(() => Math.random() - 0.5);
    const shuffledDescs = [...certs].sort(() => Math.random() - 0.5);

    shuffledMarks.forEach(cert => {
      const card = document.createElement("div");
      card.className = "cert-mark-row-card";
      card.id = `cert-mark-${cert.id}`;
      card.dataset.certId = cert.id;
      card.innerHTML = `
        <div class="cert-svg-box">
          ${VisualAssets.getCertMarkSvg(cert.id)}
        </div>
        <div class="cert-name-label">${cert.name}</div>
      `;
      card.addEventListener("click", () => this.handleCertMarkSelect(card, cert));
      marksCol.appendChild(card);
    });

    shuffledDescs.forEach(cert => {
      const card = document.createElement("div");
      card.className = "cert-desc-row-card";
      card.id = `cert-desc-${cert.id}`;
      card.dataset.certId = cert.id;
      card.innerHTML = `
        <div class="cert-desc-p">${cert.desc}</div>
      `;
      card.addEventListener("click", () => this.handleCertDescSelect(card, cert));
      descsCol.appendChild(card);
    });

    document.getElementById("cert-match-count").textContent = `연결 0 / ${certs.length}`;
  }

  handleCertMarkSelect(card, cert) {
    if (card.classList.contains("matched")) return;
    Sound.playClick();

    document.querySelectorAll(".cert-mark-row-card").forEach(c => c.classList.remove("selected-card"));
    card.classList.add("selected-card");
    this.state.selectedMark = cert;

    this.checkCertMatchingPair();
  }

  handleCertDescSelect(card, cert) {
    if (card.classList.contains("matched")) return;
    Sound.playClick();

    document.querySelectorAll(".cert-desc-row-card").forEach(c => c.classList.remove("selected-card"));
    card.classList.add("selected-card");
    this.state.selectedDesc = cert;

    this.checkCertMatchingPair();
  }

  checkCertMatchingPair() {
    if (!this.state.selectedMark || !this.state.selectedDesc) return;

    if (this.state.selectedMark.id === this.state.selectedDesc.id) {
      Sound.playCartSuccess();
      const markCard = document.getElementById(`cert-mark-${this.state.selectedMark.id}`);
      const descCard = document.getElementById(`cert-desc-${this.state.selectedDesc.id}`);

      markCard.classList.remove("selected-card");
      descCard.classList.remove("selected-card");
      markCard.classList.add("matched");
      descCard.classList.add("matched");

      this.state.matchedCertCount++;
      this.state.totalScore += 200; // 인증마크 정답 보너스
      this.updateHUD();

      document.getElementById("cert-match-count").textContent = `연결 ${this.state.matchedCertCount} / ${GAME_DATA.certMarks.length}`;

      this.showToast(`✨ [${this.state.selectedMark.name}] 매칭 성공! (+200점)`, "success");

      this.state.selectedMark = null;
      this.state.selectedDesc = null;

      if (this.state.matchedCertCount === GAME_DATA.certMarks.length) {
        Sound.playFanfare();
        setTimeout(() => {
          this.switchStage("result");
        }, 500);
      }
    } else {
      this.damageHp(6, "인증 마크와 설명 불일치!");
      const markCard = document.getElementById(`cert-mark-${this.state.selectedMark.id}`);
      const descCard = document.getElementById(`cert-desc-${this.state.selectedDesc.id}`);

      markCard.style.animation = "shake 0.35s ease";
      descCard.style.animation = "shake 0.35s ease";

      setTimeout(() => {
        markCard.style.animation = "";
        descCard.style.animation = "";
        markCard.classList.remove("selected-card");
        descCard.classList.remove("selected-card");
        this.state.selectedMark = null;
        this.state.selectedDesc = null;
      }, 400);
    }
  }

  /* ========================================================
   * 3. 최종 결과 영수증
   * ======================================================== */
  renderResultReceipt() {
    Sound.playFanfare();
    const finalScore = this.state.totalScore;

    // 평균 반응 속도 계산
    let avgSpeed = 1.5;
    if (this.state.reactionTimes.length > 0) {
      const sum = this.state.reactionTimes.reduce((a, b) => a + b, 0);
      avgSpeed = (sum / this.state.reactionTimes.length).toFixed(2);
    }

    let rankTitle = "👑 광속 신선 마스터 셰프";
    let rankComment = "결함 식품을 매의 눈으로 걸러내고 안전한 식재료만 카트에 담았습니다!";

    if (finalScore < 1500) {
      rankTitle = "🌱 신선 감별 연습생";
      rankComment = "감자의 싹(솔라닌), 생선의 눈알, 달걀의 표면 등을 조금 더 꼼꼼히 돋보기로 관찰해보세요!";
    } else if (finalScore < 2500) {
      rankTitle = "🥈 똑똑한 알뜰 쇼퍼";
      rankComment = "빠르고 정확하게 대부분의 결함 식품을 잘 걸러냈습니다! 최고의 소비자입니다!";
    }

    document.getElementById("receipt-final-score").textContent = `${finalScore.toLocaleString()}점`;
    document.getElementById("receipt-avg-speed").textContent = `⚡ 평균 반응: ${avgSpeed}초`;
    document.getElementById("receipt-max-combo").textContent = `🔥 최대 콤보: ${this.state.maxCombo} COMBO`;
    document.getElementById("receipt-rank-title").textContent = rankTitle;
    document.getElementById("receipt-comment").textContent = rankComment;

    const receiptDate = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
    document.getElementById("receipt-date").textContent = receiptDate;

    document.getElementById("receipt-item-count").textContent = this.state.cart.length;
    const itemsList = document.getElementById("receipt-cart-items");
    itemsList.innerHTML = "";

    if (this.state.cart.length === 0) {
      const emptyLi = document.createElement("li");
      emptyLi.style.padding = "10px";
      emptyLi.style.textAlign = "center";
      emptyLi.style.color = "#94a3b8";
      emptyLi.textContent = "담긴 식품이 없습니다.";
      itemsList.appendChild(emptyLi);
    } else {
      this.state.cart.forEach((c, idx) => {
        const li = document.createElement("li");
        li.className = "receipt-item-row";
        li.title = "클릭하여 교과서 신선 식품 감별 기준 보기";
        li.innerHTML = `
          <div class="receipt-item-left">
            <span class="receipt-item-idx">${idx + 1}.</span>
            <span class="receipt-item-name">${c.name}</span>
          </div>
          <div class="receipt-item-right">
            <span class="receipt-btn-badge">🔍 교과서 감별법</span>
            <span class="receipt-pass-tag">신선 통과 ✔</span>
          </div>
        `;
        li.addEventListener("click", () => {
          Sound.playClick();
          this.openTextbookDetailModal(c);
        });
        itemsList.appendChild(li);
      });
    }
  }

  /* ========================================================
   * 4. 교과서 신선 제품 감별 모달
   * ======================================================== */
  openTextbookDetailModal(item) {
    const modal = document.getElementById("modal-textbook-detail");
    const nameEl = document.getElementById("tb-item-name");
    const visualBox = document.getElementById("tb-visual-box");
    const ruleEl = document.getElementById("tb-rule-text");
    const expEl = document.getElementById("tb-explanation-text");

    if (!modal) return;

    nameEl.textContent = item.name;

    // 일러스트 SVG 로드
    if (typeof VisualAssets !== "undefined" && VisualAssets.getSVG) {
      visualBox.innerHTML = VisualAssets.getSVG(item.visualKey || item.id);
    } else {
      visualBox.innerHTML = `<span style="font-size:48px;">🛒</span>`;
    }

    // 교과서 원문 기준 및 위생 설명 반영
    ruleEl.textContent = item.textbookRule || "낱알이 고르고 싱싱하며 변질 및 이취가 없는 것";
    expEl.textContent = item.explanation || "품질이 신선하고 안전한 식재료입니다.";

    modal.classList.remove("hidden");
  }

  closeTextbookDetailModal() {
    const modal = document.getElementById("modal-textbook-detail");
    if (modal) modal.classList.add("hidden");
  }

  resetGame() {
    this.stopItemTimer();
    this.state.freshnessHp = 100;
    this.state.totalScore = 0;
    this.state.combo = 0;
    this.state.maxCombo = 0;
    this.state.cart = [];
    this.state.reactionTimes = [];
    this.state.currentZoneIndex = 0;
    this.state.currentItemIndex = 0;
    this.switchStage("belt");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.gameApp = new SupermarketSpeedConveyorGame();
});
