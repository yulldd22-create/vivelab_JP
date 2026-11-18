/* 商品・バナーの差し替えは、下記の products と slides を編集してください。 */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = value => `¥${value.toLocaleString('ja-JP')}`;
  const arrow = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
  const categories = { all: 'すべての商品', serum: '美容液', pad: '拭き取りパッド', cleanser: 'クレンジング' };
  const products = [
    { id: 'serum-green', category: 'serum', name: 'うるおいグリーン美容液', volume: '30mL', price: 2800, image: 'assets/product-green.svg', label: '注目の商品', keywords: '化粧水 うるおい 緑', description: '毎日のお手入れに取り入れる美容液のサンプルです。実際の成分・特徴・使い方は、商品情報に合わせて差し替えてください。' },
    { id: 'serum-amber', category: 'serum', name: 'デイリーケア美容液', volume: '30mL', price: 2600, image: 'assets/product-serum.svg', label: '', keywords: 'うるおい 茶色', description: '朝と夜のお手入れをイメージした商品サンプルです。商品の説明文・成分・注意事項をここに掲載できます。' },
    { id: 'serum-lavender', category: 'serum', name: 'ナイトケアエッセンス', volume: '30mL', price: 3200, image: 'assets/product-lavender.svg', label: '新商品', keywords: 'クリーム 夜 紫', description: '夜のスキンケアをイメージした商品サンプルです。実際の商品に合わせて説明文を変更してください。' },
    { id: 'serum-blue', category: 'serum', name: 'モイスチャーエッセンス', volume: '50mL', price: 2900, image: 'assets/product-blue.svg', label: '', keywords: '化粧水 青 ポンプ', description: 'ポンプタイプのスキンケア商品サンプルです。容量・価格・説明文は自由に変更できます。' },
    { id: 'serum-daily', category: 'serum', name: 'シンプルケア美容液', volume: '50mL', price: 3000, image: 'assets/product-green.svg', label: '', keywords: '緑 基本', description: '商品カードと詳細表示のための仮の商品です。使用方法や商品情報を追加できます。' },
    { id: 'serum-set', category: 'serum', name: '毎日のスキンケアセット', volume: '30mL × 2本', price: 4900, image: 'assets/product-serum.svg', label: 'セット', keywords: 'セット 茶色', description: 'セット商品の表示サンプルです。セット内容は実際の商品に合わせて変更してください。' },
    { id: 'pad-green', category: 'pad', name: 'デイリーグリーンパッド', volume: '60枚', price: 2200, image: 'assets/product-pad.svg', label: '注目の商品', keywords: '拭き取り ふきとり 緑', description: '拭き取りパッドの商品サンプルです。成分・使用方法・注意事項は、実際の商品情報を掲載してください。' },
    { id: 'pad-moist', category: 'pad', name: 'モイスチャーケアパッド', volume: '60枚', price: 2400, image: 'assets/product-pad.svg', label: '', keywords: '拭き取り うるおい', description: 'パッドタイプのスキンケア商品サンプルです。画像や商品の特徴を差し替えてご利用ください。' },
    { id: 'pad-simple', category: 'pad', name: 'シンプルケアパッド', volume: '40枚', price: 1800, image: 'assets/product-pad.svg', label: '新商品', keywords: '拭き取り 基本', description: '商品一覧のレイアウト確認用サンプルです。内容量と価格は仮の数値です。' },
    { id: 'pad-set', category: 'pad', name: 'パッドお手入れセット', volume: '60枚 × 2個', price: 4000, image: 'assets/product-pad.svg', label: 'セット', keywords: '拭き取り セット', description: 'セット商品用の表示サンプルです。実際のセット内容に合わせて差し替えてください。' },
    { id: 'cleanser-foam', category: 'cleanser', name: 'デイリーフォームクレンザー', volume: '150mL', price: 1900, image: 'assets/product-cleanser.svg', label: '注目の商品', keywords: '洗顔 洗う フォーム', description: '洗顔料のレイアウト用サンプルです。実際の洗浄成分や使用方法は、商品に合わせて記載してください。' },
    { id: 'cleanser-gel', category: 'cleanser', name: 'シンプルジェルクレンザー', volume: '150mL', price: 2100, image: 'assets/product-cleanser.svg', label: '', keywords: '洗顔 ジェル', description: 'ジェルタイプの洗顔料をイメージした仮の商品です。商品の特徴や使い方を追加できます。' },
    { id: 'cleanser-pump', category: 'cleanser', name: 'デイリークレンジングオイル', volume: '150mL', price: 2300, image: 'assets/product-blue.svg', label: '新商品', keywords: '洗顔 オイル ポンプ', description: 'ポンプタイプのクレンジング商品サンプルです。商品写真・説明文・容量を変更してください。' },
    { id: 'cleanser-set', category: 'cleanser', name: 'クレンジングケアセット', volume: '150mL × 2本', price: 3600, image: 'assets/product-cleanser.svg', label: 'セット', keywords: '洗顔 セット', description: 'クレンジングセットの仮の商品情報です。注文・決済には接続されていません。' }
  ];
  const slides = [
    { theme: 'green', eyebrow: '毎日のうるおいケア', title: '肌の声に、<br>まっすぐ。', description: '自分の肌を知ることから、スキンケアを。<br>毎日に寄り添う、シンプルな一滴。', cta: '美容液を見る', category: 'serum', front: 'assets/hero-green.svg', back: 'assets/hero-serum.svg' },
    { theme: 'lavender', eyebrow: '心地よい夜のお手入れ', title: '一日の終わりに、<br>自分を想うケアを。', description: '肌と向き合う、穏やかなひととき。<br>あなたらしいスキンケアを見つけましょう。', cta: 'シリーズを見る', category: 'serum', front: 'assets/hero-lavender.svg', back: 'assets/hero-blue.svg' },
    { theme: 'cream', eyebrow: '毎日の基本ケア', title: 'シンプルに、<br>心地よく、続ける。', description: '毎日のお手入れを、もっと自分らしく。<br>肌に触れる時間を大切に。', cta: '商品を見る', category: 'cleanser', front: 'assets/hero-cleanser.svg', back: 'assets/hero-pad.svg' }
  ];
  let activeCategory = 'serum';
  const getProduct = id => products.find(product => product.id === id);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function closeDialogs() { $$('dialog[open]').forEach(dialog => dialog.close()); }
  function openDialog(id) {
    closeDialogs();
    const dialog = document.getElementById(id);
    if (!dialog) return;
    closeMegaMenu();
    dialog.showModal();
    if (id === 'search-dialog') $('#search-input').focus();
  }
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    $$('[data-close]', dialog).forEach(button => button.addEventListener('click', () => dialog.close()));
  });
  function card(product) {
    return `<article class="product-card"><div class="product-image"><button type="button" data-product="${product.id}" aria-label="${product.name}の詳細を見る"><img src="${product.image}" alt="${product.name}の仮の商品画像" width="600" height="720" loading="lazy"></button>${product.label ? `<span class="product-badge">${product.label}</span>` : ''}</div><div class="product-copy"><p class="product-type">${categories[product.category]}</p><h3><button type="button" class="product-title" data-product="${product.id}">${product.name}</button></h3><p class="product-volume">${product.volume}</p><p class="product-price">${money(product.price)}<small>税込</small></p></div></article>`;
  }
  const grid = $('#product-grid');
  function updateCarouselArrows() {
    $('.previous-products').disabled = grid.scrollLeft < 3;
    $('.next-products').disabled = grid.scrollWidth - grid.clientWidth - grid.scrollLeft < 3;
  }
  function renderProducts(category) {
    activeCategory = category;
    grid.innerHTML = products.filter(product => product.category === category).map(card).join('');
    grid.scrollLeft = 0;
    grid.setAttribute('aria-labelledby', `tab-${category}`);
    $$('[data-category]').forEach(tab => {
      const selected = tab.dataset.category === category;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    requestAnimationFrame(updateCarouselArrows);
  }
  $$('[data-category]').forEach(tab => {
    tab.addEventListener('click', () => { if (tab.dataset.category !== activeCategory) renderProducts(tab.dataset.category); });
    tab.addEventListener('keydown', event => {
      const tabs = $$('[data-category]');
      let index = tabs.indexOf(tab);
      if (event.key === 'ArrowRight') index = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') index = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = tabs.length - 1;
      else return;
      event.preventDefault();
      renderProducts(tabs[index].dataset.category);
      tabs[index].focus();
    });
  });
  grid.addEventListener('scroll', updateCarouselArrows, { passive: true });
  window.addEventListener('resize', updateCarouselArrows, { passive: true });
  $('.previous-products').addEventListener('click', () => grid.scrollBy({ left: -grid.clientWidth - 24, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));
  $('.next-products').addEventListener('click', () => grid.scrollBy({ left: grid.clientWidth + 24, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));
  function showCatalog(category, selection, title) {
    $('#catalog-title').textContent = title || categories[category] || categories.all;
    let filtered = category === 'all' ? products : products.filter(product => product.category === category);
    const selections = { new: p => p.label === '新商品', set: p => p.label === 'セット', sale: p => ['serum-green','serum-amber','pad-green','cleanser-foam'].includes(p.id), toner: p => p.id === 'serum-blue', cream: p => p.id === 'serum-lavender', sunscreen: () => false, mask: () => false, hydration: p => p.id === 'serum-green', basic: p => p.id.includes('daily') || p.id.includes('simple'), night: p => p.id === 'serum-lavender', moisture: p => p.id === 'serum-blue' };
    if (selections[selection]) filtered = filtered.filter(selections[selection]);
    $('#catalog-products').innerHTML = filtered.length ? filtered.map(card).join('') : '<p class="empty-catalog">このカテゴリーの商品は準備中です。</p>';
    openDialog('catalog-dialog');
  }
  function showProduct(id) {
    const product = getProduct(id);
    if (!product) return;
    $('#product-detail').innerHTML = `<div class="detail-grid"><img src="${product.image}" alt="${product.name}の仮の商品画像" width="600" height="720"><div class="detail-copy"><p>${categories[product.category]}</p><h3 id="product-title">${product.name}</h3><p>${product.volume}</p><p class="product-price">${money(product.price)}<small>税込</small></p><p>${product.description}</p><p class="sample-note">商品・画像・価格はサンプルです。実際のご注文はできません。</p></div></div>`;
    openDialog('product-dialog');
  }
  function renderSearch() {
    const query = $('#search-input').value.trim().normalize('NFKC').toLocaleLowerCase('ja-JP');
    const results = products.filter(product => `${product.name} ${categories[product.category]} ${product.keywords}`.normalize('NFKC').toLocaleLowerCase('ja-JP').includes(query));
    $('#search-status').textContent = query ? `${results.length}件の商品が見つかりました。` : '商品名やカテゴリーから検索できます。';
    $('#search-results').innerHTML = results.length ? results.map(product => `<button type="button" class="search-result" data-product="${product.id}"><img src="${product.image}" alt="" width="600" height="720"><span><strong>${product.name}</strong><small>${product.volume} · ${money(product.price)}</small></span></button>`).join('') : '<p class="empty-state">該当する商品がありません。別のキーワードでお試しください。</p>';
  }
  $('#search-input').addEventListener('input', renderSearch);
  const info = {
    membership: ['会員特典', '会員向けの特典をご案内するエリアです。', '会員登録・クーポン・ポイントなど、実際のショップの条件を設定してください。このサンプルでは会員機能は接続されていません。'],
    points: ['ポイント利用ガイド', 'ポイントの貯め方・使い方をご案内するエリアです。', '還元率・有効期限・利用条件は、実際のショップの条件を設定してください。このサンプルでポイントは付与されません。'],
    account: ['マイページ', '会員登録・ログイン画面を設置できるエリアです。', 'このサンプルには会員機能は接続されていません。実際の公開時に、ショップサービスや会員システムのURLを設定してください。'],
    contact: ['お問い合わせ', '電話番号：+82 10 4298 0419 ／ メールアドレス：support@soonnoc.com', 'お問い合わせの際は、上記のメールアドレスをご利用ください。'],
    guide: ['ご利用ガイド', 'ご注文・お支払い・配送についてご案内するエリアです。', '送料、配送日数、利用できる決済方法など、実際のショップの条件を掲載してください。'],
    faq: ['よくあるご質問', 'ご購入や商品に関するご質問を掲載できます。', '質問と回答は、実際の商品・販売条件に合わせて用意してください。'],
    company: ['会社概要', '会社名：SOONNOC CO.,LTD. ／ 事業者登録番号：3428800839 ／ 付加価値税登録番号：3428800839', '所在地：大韓民国 ソウル特別市 城東区 Seongsui-ro 18-gil 31、301・302・303・304・307号'],
    stores: ['店舗情報', '商品を取り扱う店舗の情報を掲載できます。', '店舗名・所在地・営業時間などの正式な情報を設定してください。実在する店舗の情報は登録されていません。'],
    privacy: ['プライバシーポリシー', '個人情報の取り扱いを案内するページの配置サンプルです。', 'これは有効なプライバシーポリシーではありません。実際のデータの収集・利用・保管方法に合わせた文面を用意してください。'],
    legal: ['法的告知', '法的事項に関するご案内を掲載するエリアです。', '正式な本文は未設定です。実際の運営内容に合わせて文面を設定してください。'],
    shipping: ['配送ポリシー', '配送方法・送料・お届け日数などをご案内するエリアです。', '正式な配送条件は未設定です。対象地域、送料、発送までの日数などを設定してください。'],
    terms: ['利用規約', 'サービスの利用条件を掲載するページの配置サンプルです。', '実際の販売・サービス内容に合わせた利用規約を用意してください。'],
    commerce: ['特定商取引法に基づく表示', '販売事業者・販売条件などを表示するための配置サンプルです。', '販売事業者名、責任者、所在地、連絡先、送料、支払方法、商品の引渡時期、返品条件など、実際の情報を設定してください。'],
    returns: ['返品・交換について', '返品・交換の条件を案内するページの配置サンプルです。', '返品期限、対象条件、送料の負担、連絡方法などを実際の運営方針に合わせて設定してください。'],
  };
  function showInfo(key) {
    if (!info[key]) return;
    const [title, description, note] = info[key];
    $('#info-title').textContent = title;
    $('#info-content').innerHTML = `<p>${description}</p><p class="demo-callout">${note}</p>`;
    openDialog('info-dialog');
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.panel) {
      if (button.dataset.panel === 'search') renderSearch();
      openDialog(`${button.dataset.panel}-dialog`);
    } else if (button.dataset.catalog) showCatalog(button.dataset.catalog, button.dataset.selection, button.dataset.catalogTitle);
    else if (button.dataset.product) showProduct(button.dataset.product);
    else if (button.dataset.info) showInfo(button.dataset.info);
  });
  $$('.mobile-nav a').forEach(link => link.addEventListener('click', closeDialogs));
  function closeMegaMenu() { window.SkinMenu?.close(); }
  const hero = $('.hero');
  let slideIndex = 0, heroTimer, userPaused = false, heroVisible = true, heroHovered = false;
  function setSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
    const slide = slides[slideIndex];
    hero.className = `hero hero-${slide.theme}`;
    $('#hero-eyebrow').textContent = slide.eyebrow;
    $('#hero-title').innerHTML = slide.title;
    $('#hero-description').innerHTML = slide.description;
    $('#hero-front').src = slide.front;
    $('#hero-back').src = slide.back;
    $('#hero-cta').innerHTML = slide.cta + arrow;
    $('#hero-cta').dataset.catalog = slide.category;
    $('#slide-number').textContent = String(slideIndex + 1).padStart(2, '0');
    $$('[data-slide]').forEach(button => button.setAttribute('aria-current', String(Number(button.dataset.slide) === slideIndex)));
  }
  function syncAutoplay() {
    clearInterval(heroTimer);
    if (userPaused || reducedMotion.matches || document.hidden || !heroVisible || heroHovered || hero.contains(document.activeElement)) return;
    heroTimer = setInterval(() => setSlide(slideIndex + 1), 5000);
  }
  $$('[data-slide]').forEach(button => button.addEventListener('click', () => { setSlide(Number(button.dataset.slide)); syncAutoplay(); }));
  $('.slide-pause').addEventListener('click', event => {
    userPaused = !userPaused;
    event.currentTarget.setAttribute('aria-pressed', String(userPaused));
    event.currentTarget.setAttribute('aria-label', userPaused ? 'バナーの自動切り替えを再開' : 'バナーの自動切り替えを停止');
    event.currentTarget.textContent = userPaused ? '▶' : 'Ⅱ';
    syncAutoplay();
  });
  hero.addEventListener('mouseenter', () => { heroHovered = true; syncAutoplay(); });
  hero.addEventListener('mouseleave', () => { heroHovered = false; syncAutoplay(); });
  hero.addEventListener('focusin', syncAutoplay);
  hero.addEventListener('focusout', () => setTimeout(syncAutoplay, 0));
  document.addEventListener('visibilitychange', syncAutoplay);
  reducedMotion.addEventListener('change', syncAutoplay);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; syncAutoplay(); }, { threshold: .1 }).observe(hero);
  window.addEventListener('pagehide', () => clearInterval(heroTimer));
  window.addEventListener('pageshow', syncAutoplay);
  renderProducts(activeCategory);
  syncAutoplay();
})();
