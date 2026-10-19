/**
 * game-data.js - 마트 신선 특공대 : 컨베이어 벨트 선별 레이스 데이터
 * [개선] 교과서 100% 기반 신선도 감별 기준 (textbookRule) 및 주의점 추가
 */

const GAME_DATA = {
  zones: [
    {
      zoneId: "zone-1",
      stepNum: 1,
      name: "1구역: 실온 보관 식품 & 곡류 코너",
      icon: "🌾",
      orderRule: "장보기 순서 1단계: 온도 변화에 가장 덜 민감하여 제일 먼저 카트에 담는 구역!",
      items: [
        {
          id: "rice-good",
          name: "쌀 (백미)",
          isFresh: true,
          visualType: "rice-good",
          clue: "낱알이 고르고 맑은 반투명 빛, 금이나 부서진 가루가 없음",
          textbookRule: "낱알이 고르고 반투명하며 적당히 건조된 것",
          explanation: "곡류는 낱알이 고르고 반투명하며 잘 건조된 것이 영양과 밥맛이 가장 좋습니다.",
          dangerReason: "신선한 쌀을 버렸어요! 낱알이 반투명하고 균일하면 정상입니다."
        },
        {
          id: "rice-bad",
          name: "쌀 (백미)",
          isFresh: false,
          visualType: "rice-bad",
          clue: "알에 금이 가 있고 바닥에 싸라기 가루와 쌀벌레(바구미) 구멍이 보임",
          textbookRule: "낱알이 고르고 반투명하며 적당히 건조된 것 (금이 가거나 벌레 먹지 않은 것)",
          explanation: "금이 가거나 쌀벌레가 생긴 쌀은 밥맛이 떨어지고 곰팡이 독소 위험이 있습니다.",
          dangerReason: "🚨 결함 식품 카트 투입! 쌀벌레와 싸라기 가루가 있는 쌀입니다!"
        },
        {
          id: "bean-good",
          name: "콩 (대두)",
          isFresh: true,
          visualType: "bean-good",
          clue: "알이 굵고 고르며 껍질에 은은한 자연 광택이 흐름",
          textbookRule: "낱알이 고르고 껍질에 광택이 나며 벌레가 먹지 않은 것",
          explanation: "콩류는 낱알이 고르고 껍질에 윤기·광택이 나며 벌레가 먹지 않은 것이 신선합니다.",
          dangerReason: "신선한 콩을 버렸어요! 윤기 나는 고른 콩은 최고급 콩입니다."
        },
        {
          id: "bean-bad",
          name: "콩 (대두)",
          isFresh: false,
          visualType: "bean-bad",
          clue: "껍질이 심하게 쭈글거리고 표면에 벌레 먹은 구멍이 숭숭 뚫려 있음",
          textbookRule: "낱알이 고르고 껍질에 광택이 나며 벌레가 먹지 않은 것",
          explanation: "껍질이 쭈글거리고 벌레 구멍이 있는 콩은 수분과 영양이 파괴된 불량 콩입니다.",
          dangerReason: "🚨 결함 식품 카트 투입! 벌레 먹고 수분이 마른 콩입니다!"
        },
        {
          id: "can-good",
          name: "통조림 (참치)",
          isFresh: true,
          visualType: "can-good",
          clue: "캔 외관이 매끈하고 이음매가 견고하며 녹이나 찌그러짐 없음",
          textbookRule: "뚜껑에 녹슬거나 찌그러지지 않은 것, 직사광선을 받지 않는 곳에 보관된 것",
          explanation: "통조림은 찌그러짐이나 녹이 없고 서늘한 실온에 보관된 것이 안전합니다.",
          dangerReason: "안전한 통조림을 버렸어요! 외관이 매끈한 캔은 정상 제품입니다."
        },
        {
          id: "can-bad",
          name: "통조림 (참치)",
          isFresh: false,
          visualType: "can-bad",
          clue: "모서리가 심하게 찌그러져 있고 뚜껑 이음새에 붉은 녹이 슬어 있음",
          textbookRule: "뚜껑에 녹슬거나 찌그러지지 않은 것, 직사광선을 받지 않는 곳에 보관된 것",
          explanation: "찌그러지거나 녹슨 통조림은 내부 코팅 파손 및 치명적인 '보툴리누스 식중독균' 위험이 있습니다.",
          dangerReason: "🚨 치명적 위험! 찌그러진 캔에는 신경 독소를 뿜는 보툴리누스균이 번식할 수 있습니다!"
        }
      ]
    },

    {
      zoneId: "zone-2",
      stepNum: 2,
      name: "2구역: 채소 & 과일류 코너 (청과)",
      icon: "🍎",
      orderRule: "장보기 순서 2단계: 신선 자연식품 중 육류·어패류보다 세균 증식 위험이 상대적으로 낮은 구역!",
      items: [
        {
          id: "apple-good",
          name: "사과",
          isFresh: true,
          visualType: "apple-good",
          clue: "선명한 붉은빛이 돌고 좌우 대칭이 균일하며 멍이나 상처가 없음",
          textbookRule: "색이 진하고 멍이나 손상이 없으며 모양이 대칭인 것",
          explanation: "사과는 색이 진하고 멍이나 손상이 없으며 모양이 대칭인 것이 속까지 고르게 익어 맛있습니다.",
          dangerReason: "신선한 사과를 버렸어요! 좌우 대칭에 멍 없는 사과가 특등급입니다."
        },
        {
          id: "apple-bad",
          name: "사과",
          isFresh: false,
          visualType: "apple-bad",
          clue: "표면에 큰 갈색 타박상 멍 자국이 있고 한쪽이 비대칭으로 찌그러짐",
          textbookRule: "색이 진하고 멍이나 손상이 없으며 모양이 대칭인 것",
          explanation: "멍든 사과는 에틸렌 가스와 유해 미생물이 침투하여 과육이 물러지고 빠르게 썩습니다.",
          dangerReason: "🚨 결함 식품 카트 투입! 갈색 멍이 든 사과는 금방 썩어버립니다!"
        },
        {
          id: "watermelon-good",
          name: "수박",
          isFresh: true,
          visualType: "watermelon-good",
          clue: "검은 줄무늬가 진하고 또렷하며 꼭지 줄기가 파릇파릇 싱싱함",
          textbookRule: "줄무늬 색이 선명하며 줄기가 싱싱한 것",
          explanation: "수박은 줄무늬가 선명하고 줄기(꼭지)가 싱싱해야 수분이 풍부하고 과육이 아삭합니다.",
          dangerReason: "신선한 수박을 버렸어요! 꼭지가 싱싱한 수박이 제철 수박입니다."
        },
        {
          id: "watermelon-bad",
          name: "수박",
          isFresh: false,
          visualType: "watermelon-bad",
          clue: "줄무늬가 흐릿하고, 꼭지 줄기가 갈색으로 비틀려 바짝 말라 있음",
          textbookRule: "줄무늬 색이 선명하며 줄기가 싱싱한 것",
          explanation: "줄무늬가 흐리고 꼭지가 바짝 마른 수박은 수확 후 오래 방치되어 속이 퍼석합니다.",
          dangerReason: "🚨 선도 저하 수박 카트 투입! 꼭지가 갈색으로 마른 수박은 오래된 수박입니다!"
        },
        {
          id: "grape-good",
          name: "포도",
          isFresh: true,
          visualType: "grape-good",
          clue: "포도알이 가지에 촘촘히 붙어 있고 표면에 하얀 과분(천연 당분)이 고름",
          textbookRule: "색이 진하고 알이 촘촘하며 단단하게 붙어 있는 것 (하얀 분은 천연 당분)",
          explanation: "포도는 색이 진하고 알이 촘촘하며 표면의 하얀 분(천연 당분 과분)이 고운 것이 신선합니다.",
          dangerReason: "신선한 포도를 버렸어요! 하얀 가루는 농약이 아니라 천연 당분(과분)입니다!"
        },
        {
          id: "grape-bad",
          name: "포도",
          isFresh: false,
          visualType: "grape-bad",
          clue: "가지가 앙상하고 알이 듬성듬성 떨어져 있으며 터진 알이 보임",
          textbookRule: "색이 진하고 알이 촘촘하며 단단하게 붙어 있는 것",
          explanation: "알이 잘 떨어지고 터진 포도는 수확 후 오랜 시간이 지나 신선도가 떨어집니다.",
          dangerReason: "🚨 부패 포도 카트 투입! 알이 떨어지고 터진 포도는 이미 발효·부패 중입니다!"
        },
        {
          id: "potato-good",
          name: "감자",
          isFresh: true,
          visualType: "potato-good",
          clue: "싹이 전혀 없고 표면이 고유의 황토 갈색이며 단단함",
          textbookRule: "감자의 싹에는 솔라닌이라는 독소가 있으므로 싹이 나지 않고 껍질이 녹색을 띠지 않는 것",
          explanation: "감자는 싹이 나지 않고 껍질이 녹색을 띠지 않는 것을 골라야 솔라닌 중독을 예방할 수 있습니다.",
          dangerReason: "안전한 감자를 버렸어요! 싹이 없고 녹색이 아닌 감자가 안전합니다."
        },
        {
          id: "potato-bad",
          name: "감자",
          isFresh: false,
          visualType: "potato-bad",
          clue: "껍질 표면이 푸르스름한 녹색을 띠고 뾰족한 초록 싹이 돋아 있음",
          textbookRule: "감자의 싹에는 솔라닌이라는 독소가 있으므로 싹이 나지 않고 껍질이 녹색을 띠지 않는 것",
          explanation: "감자의 싹과 녹색 껍질에는 신경 독소인 '솔라닌(Solanine)'이 있어 심한 복통, 구토, 두통 식중독을 유발합니다!",
          dangerReason: "🚨 맹독성 솔라닌 카트 투입! 감자의 싹과 녹색 껍질은 절대 먹으면 안 됩니다!"
        },
        {
          id: "sweetpotato-good",
          name: "고구마",
          isFresh: true,
          visualType: "sweetpotato-good",
          clue: "몸통이 굵고 균일하며 표면에 검은 흠집 없이 매끈하고 단단함",
          textbookRule: "원이 굵고 모양이 균일하며 단단한 것",
          explanation: "고구마는 원이 굵고 모양이 균일하며 단단한 것이 당도가 높고 섬유질이 부드럽습니다.",
          dangerReason: "신선한 고구마를 버렸어요! 단단하고 균일한 고구마가 상등품입니다."
        },
        {
          id: "sweetpotato-bad",
          name: "고구마",
          isFresh: false,
          visualType: "sweetpotato-bad",
          clue: "표면에 검은 썩음 반점이 크게 파여 있고 잔뿌리가 덥수룩하게 나 있음",
          textbookRule: "원이 굵고 모양이 균일하며 단단한 것 (검은 반점 없는 것)",
          explanation: "검은 반점이 있는 고구마는 흑반병균에 감염되어 쓴맛이 나고 이포메아마론 독소가 있습니다.",
          dangerReason: "🚨 흑반병 독소 카트 투입! 검은 반점 고구마는 쓴맛 독소가 있어 위험합니다!"
        },
        {
          id: "spinach-good",
          name: "시금치",
          isFresh: true,
          visualType: "spinach-good",
          clue: "잎이 짙은 초록색을 띠고 힘 있게 빳빳하며 뿌리가 붉은색",
          textbookRule: "잎이 진한 초록색을 띠고 시들지 않은 것",
          explanation: "시금치는 잎이 짙은 초록색을 띠고 시들지 않은 것이 비타민C와 철분이 풍부합니다.",
          dangerReason: "싱싱한 시금치를 버렸어요! 진한 초록색에 빳빳한 시금치가 정상입니다."
        },
        {
          id: "spinach-bad",
          name: "시금치",
          isFresh: false,
          visualType: "spinach-bad",
          clue: "잎끝이 누렇게 변색(황화)되고 줄기가 힘없이 축 늘어져 있음",
          textbookRule: "잎이 진한 초록색을 띠고 시들지 않은 것",
          explanation: "누렇게 시든 시금치는 수분과 비타민이 파괴되고 질산염이 변질된 상태입니다.",
          dangerReason: "🚨 시든 시금치 카트 투입! 잎이 누렇게 뜬 시금치는 영양이 파괴되었습니다!"
        },
        {
          id: "carrot-good",
          name: "당근",
          isFresh: true,
          visualType: "carrot-good",
          clue: "진한 주황색에 표면이 울퉁불퉁하지 않고 매끈하게 둥긂",
          textbookRule: "모양이 둥글고 마디가 없이 매끈한 것",
          explanation: "당근은 주황색이 진하고 모양이 둥글며 마디 없이 매끈한 것이 심이 없어 부드럽고 달콤합니다.",
          dangerReason: "신선한 당근을 버렸어요! 매끈하고 둥근 당근이 최고입니다."
        },
        {
          id: "carrot-bad",
          name: "당근",
          isFresh: false,
          visualType: "carrot-bad",
          clue: "몸통 중간이 깊게 쩍 갈라져 있고 마디가 울퉁불퉁 튀어나옴",
          textbookRule: "모양이 둥글고 마디가 없이 매끈한 것",
          explanation: "갈라지거나 마디가 심한 당근은 수분이 부족하고 심이 질겨 식감이 거칩니다.",
          dangerReason: "🚨 불량 당근 카트 투입! 갈라지고 마디가 많은 당근은 억세서 먹기 어렵습니다!"
        }
      ]
    },

    {
      zoneId: "zone-3",
      stepNum: 3,
      name: "3구역: 냉장 가공식품 코너",
      icon: "🥛",
      orderRule: "장보기 순서 3단계: 0~10℃ 냉장 온도 유지가 필요한 가공식품을 담는 구역!",
      items: [
        {
          id: "milk-good",
          name: "우유",
          isFresh: true,
          visualType: "milk-good",
          clue: "종이팩 각이 반듯하고 0~10℃ 냉장 쇼케이스 안쪽에 시원하게 진열됨",
          textbookRule: "포장이 부풀거나 손상되지 않은 것, 용기에 표시된 대로 보관된 것(냉장 0~10℃)",
          explanation: "우유는 포장이 부풀거나 손상되지 않고 적정 냉장 온도에 잘 보관된 것이 안전합니다.",
          dangerReason: "신선한 우유를 버렸어요! 팩이 반듯하고 냉장 보관된 우유는 정상입니다."
        },
        {
          id: "milk-bad",
          name: "우유",
          isFresh: false,
          visualType: "milk-bad",
          clue: "종이팩이 내부 가스로 인해 빵빵하게 부풀어 있고 겉면이 미지근함",
          textbookRule: "포장이 부풀거나 손상되지 않은 것, 용기에 표시된 대로 보관된 것",
          explanation: "팩이 빵빵하게 부푼 우유는 부패균이 증식하여 가스를 뿜어낸 상태이므로 절대 마시면 안 됩니다.",
          dangerReason: "🚨 가스 팽창 우유 카트 투입! 부패 미생물이 가스를 내뿜은 위험 우유입니다!"
        }
      ]
    },

    {
      zoneId: "zone-4",
      stepNum: 4,
      name: "4구역: 육류 & 어패류 코너 (정육/수산)",
      icon: "🥩",
      orderRule: "장보기 순서 4단계: 상온에서 미생물 증식 위험이 매우 높아 카트에 머무는 시간을 최소화하는 구역!",
      items: [
        {
          id: "beef-good",
          name: "쇠고기",
          isFresh: true,
          visualType: "beef-good",
          clue: "살코기가 선명한 붉은색(선홍빛)이고, 눌렀을 때 탄력 있게 복원됨",
          textbookRule: "살코기가 선명한 붉은색을 띠며 눌렀을 때 탄력이 있는 것",
          explanation: "쇠고기는 살코기가 선명한 붉은색을 띠고 눌렀을 때 탄력 있게 복원되는 것이 신선합니다.",
          dangerReason: "신선한 쇠고기를 버렸어요! 선홍색에 탄력 있는 쇠고기는 1등급입니다."
        },
        {
          id: "beef-bad",
          name: "쇠고기",
          isFresh: false,
          visualType: "beef-bad",
          clue: "살코기가 칙칙한 암갈색으로 변색되고 바닥에 핏물이 흥건히 고임",
          textbookRule: "살코기가 선명한 붉은색을 띠며 눌렀을 때 탄력이 있는 것",
          explanation: "암갈색으로 변하고 육즙이 많이 빠져나온 고기는 이미 산화 및 변질이 진행된 상태입니다.",
          dangerReason: "🚨 변질 쇠고기 카트 투입! 암갈색으로 산화된 고기는 세균이 번식했습니다!"
        },
        {
          id: "pork-good",
          name: "돼지고기",
          isFresh: true,
          visualType: "pork-good",
          clue: "살코기는 고운 분홍색, 비계 지방은 맑고 단단한 흰색",
          textbookRule: "살코기는 분홍색을 띠고 지방이 흰색인 것",
          explanation: "돼지고기는 살코기가 분홍색이고 지방이 흰색이어야 잡내가 없고 가장 신선합니다.",
          dangerReason: "신선한 돼지고기를 버렸어요! 분홍 살코기와 흰 지방이 신선육의 상징입니다."
        },
        {
          id: "pork-bad",
          name: "돼지고기",
          isFresh: false,
          visualType: "pork-bad",
          clue: "살코기 색이 거무스름하고, 비계 지방이 누런색(황색)으로 변색됨",
          textbookRule: "살코기는 분홍색을 띠고 지방이 흰색인 것",
          explanation: "비계 지방이 누렇게 변한 고기는 지방산이 산패되어 불쾌한 누린내와 독소를 유발합니다.",
          dangerReason: "🚨 지방 산패 고기 카트 투입! 누런 기름이 낀 고기는 산패된 고기입니다!"
        },
        {
          id: "chicken-good",
          name: "닭고기",
          isFresh: true,
          visualType: "chicken-good",
          clue: "살코기가 연한 분홍색을 띠고 피멍이 없으며 껍질이 팽팽함",
          textbookRule: "살코기가 연한 분홍색을 띠며 닭발이나 피멍이 없는 것",
          explanation: "닭고기는 살코기가 연한 분홍색을 띠며 피멍이 없는 것이 위생적이고 신선합니다.",
          dangerReason: "신선한 닭고기를 버렸어요! 연분홍빛에 피멍 없는 닭이 최고입니다."
        },
        {
          id: "chicken-bad",
          name: "닭고기",
          isFresh: false,
          visualType: "chicken-bad",
          clue: "관절과 껍질 안쪽에 검붉은 피멍 자국이 맺혀 있고 살이 물렁함",
          textbookRule: "살코기가 연한 분홍색을 띠며 닭발이나 피멍이 없는 것",
          explanation: "피멍이 든 부위는 미생물이 빠르게 번식하므로 피해야 합니다.",
          dangerReason: "🚨 오염 닭고기 카트 투입! 피멍 자국은 세균 번식의 온상입니다!"
        },
        {
          id: "egg-good",
          name: "달걀",
          isFresh: true,
          visualType: "egg-good",
          clue: "표면이 까칠까칠 거칠고 빛을 비춰도 광택이 전혀 없음",
          textbookRule: "껍데기가 거칠고 광택이 없는 것",
          explanation: "신선한 달걀은 껍데기에 천연 보호막인 '큐티클층'이 살아있어 표면이 거칠고 광택이 없습니다.",
          dangerReason: "신선란을 버렸어요! 거칠고 까칠까칠한 달걀이 오늘 낳은 신선란입니다."
        },
        {
          id: "egg-bad",
          name: "달걀",
          isFresh: false,
          visualType: "egg-bad",
          clue: "표면이 기름 바른 듯 반질반질 윤기 나고 매우 매끄러움",
          textbookRule: "껍데기가 거칠고 광택이 없는 것 (산란 직후 큐티클 보호막 유지)",
          explanation: "반들반들 윤기 나는 달걀은 천연 보호막(큐티클)이 벗겨져 세균 침투 위험이 높은 오래된 달걀입니다!",
          dangerReason: "🚨 함정 문제 걸림! 번들거리는 달걀은 보호막이 마모된 오래된 달걀입니다!"
        },
        {
          id: "fish-good",
          name: "생선 (고등어)",
          isFresh: true,
          visualType: "fish-good",
          clue: "눈알이 맑고 투명하게 밖으로 볼록 튀어나와 있으며 아가미가 선홍색",
          textbookRule: "아가미가 선홍색이며 눈알이 투명하고 튀어나와 있는 것, 살에 탄력이 있으며 비린내가 나지 않는 것",
          explanation: "눈알이 맑고 튀어나와 있으며 아가미가 선홍색이고 탄력 있는 생선이 가장 신선합니다.",
          dangerReason: "최고의 생선을 버렸어요! 맑은 눈알과 선홍빛 아가미는 특등급 생선입니다."
        },
        {
          id: "fish-bad",
          name: "생선 (고등어)",
          isFresh: false,
          visualType: "fish-bad",
          clue: "눈이 뿌옇고 푹 꺼져 있으며 아가미 덮개를 열면 암갈색으로 변함",
          textbookRule: "아가미가 선홍색이며 눈알이 투명하고 튀어나와 있는 것, 살에 탄력이 있으며 비린내가 나지 않는 것",
          explanation: "눈이 탁하게 꺼지고 아가미가 암갈색인 생선은 부패균이 증식한 상태입니다.",
          dangerReason: "🚨 부패 생선 카트 투입! 탁한 눈과 암갈색 아가미는 부패의 신호입니다!"
        }
      ]
    },

    {
      zoneId: "zone-5",
      stepNum: 5,
      name: "5구역: 냉동식품 코너",
      icon: "🧊",
      orderRule: "장보기 순서 5단계: 상온에 노출되면 녹았다 재냉동되어 식중독균이 폭발하므로 무조건 맨 마지막에 담는 구역!",
      items: [
        {
          id: "frozen-good",
          name: "냉동식품 (만두)",
          isFresh: true,
          visualType: "frozen-good",
          clue: "봉지 안에서 만두 알이 서로 엉겨 붙지 않고 낱알이 분리되어 흔들림",
          textbookRule: "식품이 단단하게 얼어 있고 녹았던 흔적이 없는 것",
          explanation: "냉동식품은 해동된 흔적 없이 낱알이 분리되어 단단히 언 것을 골라야 안전합니다.",
          dangerReason: "잘 언 만두를 버렸어요! 낱알이 보송하게 분리된 만두는 정상입니다."
        },
        {
          id: "frozen-bad",
          name: "냉동식품 (만두)",
          isFresh: false,
          visualType: "frozen-bad",
          clue: "봉지 안에 하얀 성에가 가득하고 만두들이 거대한 한 덩어리로 엉겨 붙어 떡짐",
          textbookRule: "식품이 단단하게 얼어 있고 녹았던 흔적이 없는 것 (얼음 덩어리 뭉침, 성에 없는 것)",
          explanation: "얼음 덩어리로 뭉친 만두는 유통 중 녹았다가 다시 언 것으로, 세균 증식 위험이 매우 큽니다!",
          dangerReason: "🚨 재냉동 흔적 만두 카트 투입! 얼음 덩어리로 엉겨 붙은 만두는 식중독 위험이 큽니다!"
        }
      ]
    }
  ],

  certMarks: [
    {
      id: "organic",
      name: "유기농",
      sub: "ORGANIC",
      dept: "농림축산식품부",
      desc: "유기 합성 농약과 화학 비료를 일절 사용하지 않고 재배한 농산물",
      category: "친환경 농산물"
    },
    {
      id: "pesticide-free",
      name: "무농약",
      sub: "NON PESTICIDE",
      dept: "농림축산식품부",
      desc: "유기 합성 농약은 쓰지 않고, 화학 비료는 권장량의 1/3 이하로 줄여 재배한 농산물",
      category: "친환경 농산물"
    },
    {
      id: "antibiotic-free",
      name: "무항생제",
      sub: "NON ANTIBIOTIC",
      dept: "농림축산식품부",
      desc: "항생제, 항균제, 호르몬제가 들어가지 않은 사료를 먹여 건강하게 사육한 축산물",
      category: "안심 축산물"
    },
    {
      id: "organic-processed",
      name: "유기가공식품",
      sub: "ORGANIC PROCESSED",
      dept: "농림축산식품부",
      desc: "유기 농·축산물을 주원료(95% 이상)로 하여 안전하게 제조한 가공식품",
      category: "가공식품"
    },
    {
      id: "gap",
      name: "GAP (농산물우수관리)",
      sub: "GAP CERTIFIED",
      dept: "농림축산식품부",
      desc: "생산부터 수확, 포장까지 농약, 중금속, 미생물 등 위해 요소를 사전에 안전 관리한 농산물",
      category: "농산물 안전"
    },
    {
      id: "low-carbon",
      name: "저탄소",
      sub: "LOW CARBON",
      dept: "농림축산식품부",
      desc: "친환경 또는 GAP 인증 농산물 중 온실가스 배출을 줄이는 저탄소 기술로 생산된 농산물",
      category: "환경 보전"
    },
    {
      id: "traditional-food",
      name: "전통식품",
      sub: "TRADITIONAL FOOD",
      dept: "농림축산식품부",
      desc: "국내산 농산물을 주원료로 하여 우리 고유의 맛과 전통 방식으로 가공한 우수 식품",
      category: "전통 식문화"
    },
    {
      id: "haccp",
      name: "HACCP (해썹)",
      sub: "식품안전관리인증",
      dept: "식품의약품안전처",
      desc: "원재료부터 제조, 가공, 유통까지 모든 단계의 위해 요소를 중점 관리하여 안전한 식품",
      category: "종합 위생 안전"
    }
  ]
};

if (typeof window !== "undefined") {
  window.GAME_DATA = GAME_DATA;
}
