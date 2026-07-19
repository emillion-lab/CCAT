// CCAT v2 — Наръчник (рендерира се в #handbook)
const HANDBOOK = `
<div class="section">
  <h2>🪞 Огледалните числа — новата рамка за запомняне</h2>
  <p style="margin-bottom:15px">Ключовите числа в изпита идват по ДВОЙКИ. Запомни двойката — знаеш два отговора наведнъж:</p>
  <div class="signs-grid">
    <div class="speed-card"><div class="speed-number">9 / 9</div><div class="sign-title">9ч кормуване дневно ↔ 9ч намалена дневна почивка</div></div>
    <div class="speed-card"><div class="speed-number">45 / 45</div><div class="sign-title">45 МИН прекъсване ↔ 45 ЧАСА седмична почивка</div></div>
    <div class="speed-card"><div class="speed-number">56 / 56</div><div class="sign-title">56 ЧАСА управление/седмица ↔ 56 ДНИ тахо записи</div></div>
    <div class="speed-card"><div class="speed-number">90 / 90</div><div class="sign-title">90 ЧАСА за 2 седмици ↔ 90 KM/H макс за камион</div></div>
  </div>
  <div class="mnemonic-box">💡 Бонус тройка: 3× намалена дневна почивка △ | компенсация до 3-тата седмица 🥉 | 3 = бронз</div>
</div>

<div class="section">
  <h2>🏎️ Скорости — КОРИГИРАНИ (чл. 21 ЗДвП, в сила от 07.09.2025)</h2>
  <div style="background:rgba(239,68,68,0.12);padding:15px;border-radius:10px;border-left:4px solid #ef4444;margin-bottom:15px">
    <strong>⚠️ Законът се промени!</strong> Старите стойности (90/110/120) са за категория B. Камионът C спира на <strong style="color:#ef4444">90</strong>.
  </div>
  <table class="table">
    <tr><th>Категория</th><th>Населено</th><th>Извън</th><th>Магистрала</th><th>Скоростен</th></tr>
    <tr><td><strong style="color:#10b981">C и CE</strong> 🚛</td><td>50</td><td><strong>80</strong></td><td><strong>90</strong></td><td><strong>90</strong></td></tr>
    <tr><td>C1 и C1E (до 7.5т)</td><td>50</td><td>80</td><td>100</td><td>100</td></tr>
    <tr><td>B (за сравнение)</td><td>50</td><td>90</td><td>140</td><td>120</td></tr>
  </table>
  <div class="mnemonic-box">💡 C/CE: <strong>50-80-90-90</strong> — "осем преди двете деветки". СЕ = <strong>С</strong>коростен = <strong>Е</strong>днакво с магистралата.</div>
  <div class="mnemonic-box">💡 C1 = "малкият носи стотачка" (100/100). B лети на 140, камионът спира на 90.</div>
  <div class="mnemonic-box">💡 Ново (ал. 3): контролира се и СРЕДНАТА скорост в участък — не само моментната!</div>
</div>

<div class="section">
  <h2>🕐 Работно време (Регламент ЕС 561/2006)</h2>
  <table class="table">
    <tr><th>Параметър</th><th>Стойност</th><th>💡 Мнемоника</th></tr>
    <tr><td>Дневно управление</td><td><strong>9 часа</strong></td><td>9 to 5; огледално с 9ч намалена почивка</td></tr>
    <tr><td>Удължение до 10ч</td><td><strong>2× седмично</strong></td><td>2×10</td></tr>
    <tr><td>Прекъсване след</td><td><strong>4.5 часа</strong></td><td>4.5 → 45 (махни точката)</td></tr>
    <tr><td>Минимум прекъсване</td><td><strong>45 мин</strong></td><td>дели се САМО 15+30, в този ред</td></tr>
    <tr><td>Седмично управление</td><td><strong>56 часа</strong></td><td>7×8; огледално с 56 дни записи</td></tr>
    <tr><td>Две седмици</td><td><strong>90 часа</strong></td><td>огледално с 90 km/h</td></tr>
    <tr><td>Дневна почивка</td><td><strong>11 часа</strong></td><td>11 = 🛏️🛏️ две легла</td></tr>
    <tr><td>Намалена дневна</td><td><strong>9 часа, 3× макс</strong></td><td>БЕЗ компенсация!</td></tr>
    <tr><td>Седмична почивка</td><td><strong>45 часа</strong></td><td>уикенд и половина; НЕ в кабината</td></tr>
    <tr><td>Намалена седмична</td><td><strong>24 часа</strong></td><td>компенсация до 3-тата седмица 🥉</td></tr>
  </table>
</div>

<div class="section">
  <h2>📟 Тахограф</h2>
  <table class="table">
    <tr><th>Правило</th><th>Стойност</th><th>💡</th></tr>
    <tr><td>Записи при проверка</td><td><strong>текущ ден + 56 дни</strong></td><td>от 31.12.2024 (беше 28!)</td></tr>
    <tr><td>Карта на водача</td><td><strong>5 години</strong></td><td>една ръка ✋; САМО лична</td></tr>
    <tr><td>Повредена карта</td><td><strong>заявление до 7 дни</strong></td><td>междувременно разпечатки</td></tr>
  </table>
</div>

<div class="section">
  <h2>📄 Документи</h2>
  <table class="table">
    <tr><th>Документ</th><th>Валидност</th><th>💡</th></tr>
    <tr><td>Лиценз на Общността</td><td><strong>10 години</strong></td><td>десетилетие 🗓️</td></tr>
    <tr><td>Карта за квалификация</td><td><strong>5 години</strong></td><td>✋ + 35ч периодично обучение</td></tr>
    <tr><td>Карта за тахограф</td><td><strong>5 години</strong></td><td>също ✋</td></tr>
    <tr><td>Психологическа годност</td><td><strong>БЕЗСРОЧНА</strong></td><td>∞ от '22 (Наредба №36; беше 3 год.)</td></tr>
  </table>
</div>

<div class="section">
  <h2>📦 Конвенции — цветовете говорят</h2>
  <table class="table">
    <tr><th>Табела</th><th>Цвят</th><th>Значение</th><th>💡</th></tr>
    <tr><td><strong>ATP</strong></td><td>🟠 оранжева</td><td>скоропортящи храни (хладилник)</td><td>оранжада в хладилника 🧊</td></tr>
    <tr><td><strong>ADR</strong></td><td>🔴 червена + номер</td><td>опасни товари</td><td>червено = опасност ☣️</td></tr>
    <tr><td><strong>TIR</strong></td><td>🔵 синя</td><td>транзит без митница</td><td>запечатан 🔒</td></tr>
    <tr><td><strong>CMR</strong></td><td>💗 розова</td><td>международна товарителница</td><td>хартията е розова</td></tr>
    <tr><td><strong>ЕКМТ</strong></td><td>🟢 зелена</td><td>многократно разрешително</td><td>зелена светлина много пъти ♻️</td></tr>
  </table>
</div>

<div class="section">
  <h2>🚛 Товар и превоз на хора</h2>
  <table class="table">
    <tr><th>Правило</th><th>Стойност</th><th>💡</th></tr>
    <tr><td>Стърчащ товар отпред/отзад</td><td><strong>до 1 м</strong> без обозначение</td><td>1 стъпка 📏</td></tr>
    <tr><td>Стърчащ товар отстрани</td><td><strong>до 0.2 м</strong></td><td>една длан 👋</td></tr>
    <tr><td>Обозначение денем</td><td><strong>🚩 червен флаг</strong></td><td rowspan="3">отзад = червено (стопове),<br>отпред = бяло (фарове)</td></tr>
    <tr><td>Нощем отзад</td><td><strong>🔴 червена светлина</strong></td></tr>
    <tr><td>Нощем отпред</td><td><strong>⚪ бяла светлина</strong></td></tr>
    <tr><td>Хора в каросерия</td><td><strong>1т = 1 човек, макс 8</strong></td><td>8 = ∞</td></tr>
    <tr><td>Хора в ремарке</td><td><strong style="color:#ef4444">ЗАБРАНЕНО</strong></td><td>⛔</td></tr>
    <tr><td>Животни непрекъснато</td><td><strong>8 часа</strong></td><td>работен ден 🐄</td></tr>
  </table>
</div>
`;
