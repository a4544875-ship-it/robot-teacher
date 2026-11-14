/* v15 社會島「家鄉小鎮」：三、四年級社會，跟著學校進度開站、五種題型、錯題複習、家鄉徽章 */
(function(global){
'use strict';
var SOCI=/*SOCI*/{"lion_happy":"assets/img/soc-lion_happy-26720b11f9.webp","lion_think":"assets/img/soc-lion_think-23ac345968.webp","lion_cheer":"assets/img/soc-lion_cheer-860c44c8a3.webp","lion_wow":"assets/img/soc-lion_wow-c37cc54e80.webp","lion_wave":"assets/img/soc-lion_wave-81b666c7b0.webp","lion_sad":"assets/img/soc-lion_sad-efdf5b0a83.webp","badge":"assets/img/soc-badge-91139edba1.webp","compass":"assets/img/soc-compass-b6b3e512ee.webp","chest":"assets/img/soc-chest-11a8d277ef.webp","mt":"assets/img/soc-mt-4fe6200d5c.webp","hill":"assets/img/soc-hill-b517eb63d9.webp","plat":"assets/img/soc-plat-8e66da0896.webp","basin":"assets/img/soc-basin-30ccf2878d.webp","plain":"assets/img/soc-plain-a503c6f279.webp","h_min":"assets/img/soc-h_min-24ba016a36.webp","h_hak":"assets/img/soc-h_hak-0819c94776.webp","h_stone":"assets/img/soc-h_stone-134aab54e9.webp","h_mud":"assets/img/soc-h_mud-84d4cc510b.webp","f_cny":"assets/img/soc-f_cny-b45bf5f278.webp","f_lan":"assets/img/soc-f_lan-97375759ae.webp","f_tomb":"assets/img/soc-f_tomb-947a2cc5cf.webp","f_boat":"assets/img/soc-f_boat-29ce85c536.webp","f_ghost":"assets/img/soc-f_ghost-efa076323b.webp","f_moon":"assets/img/soc-f_moon-093cf02fc7.webp","gate":"assets/img/soc-gate-268663b1d2.webp","map3":"assets/img/soc-map3-77efd18a1d.webp","map4":"assets/img/soc-map4-dbe2de67eb.webp","town":"assets/img/soc-town-1935bbb13d.webp"};

/* ================= 題庫 =================
   M 選擇題(題目,正解,[錯誤選項],解說)
   I 看圖選(題目,正解圖,[錯誤圖],解說)
   T 是非題(題目,對錯,解說)
   S 分類(題目,[兩個籃子],[[項目,籃子]],解說)
   O 排順序(題目,[正確順序],解說)
   P 配對(題目,[[左,右]],解說) */
function M(q,a,o,e){return {t:'mc',q:q,a:a,o:o,e:e||''}}
function I(q,a,o,e){return {t:'mi',q:q,a:a,o:o,e:e||''}}
function T(q,a,e){return {t:'tf',q:q,a:a,e:e||''}}
function S(q,b,it,e){return {t:'sort',q:q,b:b,it:it,e:e||''}}
function O(q,it,e){return {t:'ord',q:q,it:it,e:e||''}}
function P(q,pr,e){return {t:'pair',q:q,pr:pr,e:e||''}}
var CAP={mt:'山地',hill:'丘陵',plat:'台地',basin:'盆地',plain:'平原',h_min:'閩南三合院',h_hak:'客家伙房',h_stone:'原住民石板屋',h_mud:'土角厝',
  f_cny:'春節',f_lan:'元宵節',f_tomb:'清明節',f_boat:'端午節',f_ghost:'中元節',f_moon:'中秋節'};

var BANK={
/* ---------- 三上一 我的家庭 ---------- */
'3a1-1':[
 M('爸爸、媽媽和孩子住在一起，這樣的家庭叫做什麼？','小家庭',['三代同堂','單親家庭','祖孫家庭'],'只有父母和孩子一起生活，叫小家庭，也叫核心家庭。'),
 M('爺爺奶奶、爸爸媽媽和孩子住在一起，叫做什麼家庭？','三代同堂',['小家庭','單親家庭','祖孫家庭'],'祖父母、父母、孩子三代住在一起，就是三代同堂。'),
 M('只有媽媽（或爸爸）和孩子一起生活，叫做什麼家庭？','單親家庭',['三代同堂','小家庭','大家族'],'由爸爸或媽媽其中一位照顧孩子，叫單親家庭。'),
 M('爸媽到外地工作，孩子和爺爺奶奶一起生活，叫做什麼家庭？','祖孫家庭',['小家庭','單親家庭','三代同堂'],'由祖父母照顧孫子女，叫祖孫家庭，也叫隔代教養家庭。'),
 M('媽媽從越南來台灣，和爸爸組成家庭，這樣的家庭常叫做什麼？','新住民家庭',['祖孫家庭','單親家庭','三代同堂'],'爸爸或媽媽來自其他國家，常稱為新住民家庭。'),
 T('每個家庭的成員組成都一模一樣。',false,'家庭有很多不同的樣子，每一種都值得尊重。'),
 T('不同樣子的家庭，都一樣可以充滿愛。',true,'不管家裡有幾個人、是誰照顧你，家人的愛都一樣珍貴。'),
 M('媽媽的哥哥或弟弟，你要叫他什麼？','舅舅',['叔叔','伯伯','姑丈'],'媽媽的兄弟叫舅舅。'),
 M('爸爸的姊姊或妹妹，你要叫她什麼？','姑姑',['阿姨','舅媽','嬸嬸'],'爸爸的姊妹叫姑姑。'),
 M('爸爸的弟弟，你要叫他什麼？','叔叔',['伯伯','舅舅','姨丈'],'比爸爸小的兄弟叫叔叔，比爸爸大的叫伯伯。'),
 M('爸爸的哥哥，你要叫他什麼？','伯伯',['叔叔','舅舅','姑丈'],'比爸爸大的兄弟叫伯伯。'),
 M('媽媽的姊姊或妹妹，你要叫她什麼？','阿姨',['姑姑','嬸嬸','伯母'],'媽媽的姊妹叫阿姨。'),
 M('媽媽的爸爸，你要叫他什麼？','外公',['爺爺','伯公','叔公'],'媽媽的爸爸媽媽是外公、外婆；爸爸的爸爸媽媽是爺爺、奶奶。'),
 P('把稱謂配對起來',[['爸爸的爸爸','爺爺'],['媽媽的媽媽','外婆'],['爸爸的姊妹','姑姑'],['媽媽的兄弟','舅舅']],'記法：爸爸那邊叫爺爺、奶奶、伯伯、叔叔、姑姑；媽媽那邊叫外公、外婆、舅舅、阿姨。'),
 S('這些親戚是爸爸那邊，還是媽媽那邊？',['爸爸那邊','媽媽那邊'],[['爺爺',0],['姑姑',0],['叔叔',0],['外公',1],['舅舅',1],['阿姨',1]],'爸爸那邊：爺爺、奶奶、伯伯、叔叔、姑姑。媽媽那邊：外公、外婆、舅舅、阿姨。')
],
'3a1-2':[
 M('小明生病了，媽媽帶他看醫生、在旁邊照顧他。這是家庭的哪一種功能？','照顧與保護',['賺錢生活','休閒娛樂','教育學習'],'家人在我們生病、遇到危險時照顧保護我們。'),
 M('爸爸教小美寫功課、睡前說故事給她聽。這是家庭的哪一種功能？','教育學習',['賺錢生活','照顧與保護','休閒娛樂'],'家是我們第一個學習的地方，家人會教我們知識和生活的道理。'),
 M('爸媽努力工作賺錢，讓家人有飯吃、有衣服穿。這是家庭的哪一種功能？','賺錢生活',['休閒娛樂','教育學習','情感支持'],'這叫經濟的功能：賺錢讓全家能生活。'),
 M('週末全家一起去爬山、野餐。這是家庭的哪一種功能？','休閒娛樂',['賺錢生活','教育學習','照顧與保護'],'一起出遊放鬆，是家庭的休閒娛樂功能。'),
 M('小華難過的時候，家人抱抱他、陪他聊天。這是家庭的哪一種功能？','情感支持',['賺錢生活','休閒娛樂','教育學習'],'家人給我們愛和安慰，讓我們心裡有依靠。'),
 T('家事只是爸爸媽媽的工作，小孩不用幫忙。',false,'家是大家的，每個人都可以分擔自己做得到的家事。'),
 S('這些家事，哪些是你可以自己做的？',['我可以自己做','要請大人來做'],[['摺衣服',0],['倒垃圾',0],['澆花',0],['整理書包',0],['用瓦斯爐炒菜',1],['修理電線',1]],'用火、用電這類危險的工作要交給大人，其他做得到的家事可以主動幫忙。'),
 M('家人一起分擔家事，最大的好處是什麼？','大家比較輕鬆，感情也更好',['可以不用寫功課','可以多拿零用錢','爸媽就不用上班'],'一起做家事，每個人都輕鬆一點，也更懂得體諒家人。'),
 M('媽媽下班回家很累了，你可以怎麼做？','主動幫忙收碗筷',['吵著要出去玩','一直看電視','把玩具丟滿地'],'體貼家人的辛苦，主動幫忙就是很棒的表現。'),
 T('家人意見不一樣時，好好說出想法、也聽聽別人怎麼說，比較能解決問題。',true,'溝通的時候先聽、再好好說，家人更容易找到大家都同意的方法。'),
 M('家裡規定「晚上九點前要上床睡覺」，主要是為了什麼？','讓家人生活健康、有規律',['處罰小孩','讓爸媽偷懶','沒有原因'],'家規是為了讓全家生活健康、有秩序。')
],
'3a1-3':[
 M('過年的時候，很多家庭會怎麼和親人聯絡感情？','回老家團圓、拜年',['一個人在家打電動','都不出門也不聯絡','去學校上課'],'過年回老家團圓、向長輩拜年，是重要的親人往來。'),
 M('外婆住得很遠，平常可以怎麼和她保持聯絡？','打電話或視訊',['等明年過年再說','不用聯絡','只在生日時想起她'],'打電話、視訊、寫卡片，都能讓遠方的親人感受到關心。'),
 M('收到長輩給的紅包，有禮貌的做法是什麼？','雙手接過，說謝謝和吉祥話',['馬上打開數錢','用搶的','說怎麼這麼少'],'雙手接過、說謝謝，是對長輩的尊重。'),
 T('親戚生病住院時，去探望、關心他，是表達關心的方式。',true,'探望或打電話問候，都能讓生病的親人感到溫暖。'),
 M('參加親戚的喜宴時，應該怎麼做？','穿著整齊，有禮貌地祝福新人',['在餐廳裡跑來跑去','一直玩手機不理人','把喜歡的菜都夾到自己碗裡'],'參加喜宴要有禮貌，一起分享新人的喜悅。'),
 M('現在很多親人住在不同的地方，常用什麼方式聯絡？','手機訊息和視訊',['點烽火','飛鴿傳書','完全不聯絡'],'科技讓住得遠的親人也能常常聯絡。'),
 M('伯伯或叔叔的孩子，是你的什麼人？','堂兄弟姊妹',['表兄弟姊妹','親兄弟姊妹','鄰居'],'爸爸兄弟的孩子是堂兄弟姊妹；其他親戚（姑姑、舅舅、阿姨）的孩子是表兄弟姊妹。'),
 M('舅舅的孩子，是你的什麼人？','表兄弟姊妹',['堂兄弟姊妹','親兄弟姊妹','鄰居'],'舅舅、阿姨、姑姑的孩子都是表兄弟姊妹。'),
 T('畫一張卡片送給爺爺奶奶，也是表達關心的方法。',true,'親手做的卡片，長輩收到一定很開心。'),
 M('家族聚會時，長輩在說以前的故事，你可以怎麼做？','專心聽，還可以發問',['一直插嘴','走開去玩','說好無聊'],'聽長輩說故事，可以認識家族和家鄉以前的樣子。')
],
/* ---------- 三上二 學習與成長 ---------- */
'3a2-1':[
 M('上課聽到重要的內容，可以怎麼做幫助記憶？','做筆記',['發呆','跟同學聊天','趴著睡覺'],'把重點寫下來，複習時更容易想起來。'),
 M('遇到不會念、不懂意思的字，可以怎麼辦？','查字典',['跳過不管','亂猜一個','把那頁撕掉'],'字典可以告訴我們字的讀音和意思。'),
 M('上網查資料時，要注意什麼？','和大人一起，找可靠的網站',['看到什麼都相信','把自己的地址告訴陌生人','順便一直玩遊戲'],'網路上的資料不一定正確，也要保護自己的個人資料。'),
 M('「預習」是什麼意思？','上課前先看一看要學的內容',['考完試再看','只看答案','完全不用看書'],'先預習，上課時更容易聽懂。'),
 M('「複習」是什麼意思？','把學過的內容再看一次、再練習',['學全新的內容','上課前先看','把書收起來'],'常常複習，學過的東西才不會忘記。'),
 M('把主題寫在中間，再向外畫出相關的想法，這叫做什麼？','心智圖',['地圖','月曆','樂譜'],'心智圖可以幫我們整理想法、看出重點之間的關係。'),
 T('上課有不懂的地方，勇敢舉手問老師，是很好的學習方法。',true,'問問題能讓我們更快弄懂，老師也很樂意回答。'),
 T('一邊看電視一邊讀書，才能學得又快又好。',false,'讀書要專心，分心反而學得比較慢。'),
 M('小組討論時，好的做法是什麼？','輪流發言，也聽別人說',['一個人一直講','不說話也不聽','笑別人的想法'],'每個人都有機會說，也尊重別人的意見。'),
 O('寫作業的好習慣，照順序排排看',['準備好課本和文具','專心寫作業','檢查有沒有寫錯','收拾好書包'],'先準備、再專心寫、寫完檢查、最後收拾，就是好習慣。'),
 S('這些是好的學習習慣嗎？',['好習慣','要改掉的習慣'],[['定時複習',0],['上課專心聽',0],['做筆記',0],['邊寫功課邊玩手機',1],['作業拖到最後一刻',1],['上課跟同學聊天',1]],'好的習慣會讓學習更輕鬆。')
],
'3a2-2':[
 T('學習只能在教室裡發生。',false,'博物館、圖書館、家裡、大自然，到處都可以學習。'),
 M('想學游泳，最適合去哪裡學？','游泳池，跟教練學',['圖書館','菜市場','郵局'],'學游泳要在游泳池，跟著教練才安全。'),
 M('想借書回家看，可以去哪裡？','圖書館',['消防局','警察局','加油站'],'圖書館可以借書、查資料，是很好的學習地方。'),
 M('參加學校球隊，除了運動技巧，還能學到什麼？','團隊合作和不放棄的精神',['吵架','偷懶','說謊'],'團隊運動讓我們學會合作、守規則和堅持。'),
 M('種菜、觀察菜苗慢慢長大，可以學到什麼？','植物怎麼生長，也學會有耐心',['怎麼開車','怎麼修電腦','怎麼開飛機'],'動手做、親眼觀察，是很棒的學習。'),
 M('剛開始學直笛一直吹錯音，好的態度是什麼？','多練習，不放棄',['馬上放棄','怪老師','把直笛丟掉'],'每個人學新東西都會出錯，多練習就會進步。'),
 M('奶奶教你包水餃，這是向誰學習？','家人',['電視','機器人','沒有學到東西'],'家人也是我們的老師，可以教我們生活的本領。'),
 T('每個人擅長的事情不一樣，可以互相學習。',true,'有人會畫畫、有人很會跑，大家互相學習一起進步。'),
 O('人長大的順序，排排看',['嬰兒','幼兒園小朋友','國小學生','國中學生'],'我們一天一天長大，會做的事情也越來越多。'),
 M('長大以後，自己會做的事越來越多，例如什麼？','自己整理書包、自己洗澡',['要別人餵飯','還不會走路','還不會說話'],'會照顧自己，就是成長的表現。'),
 S('這些是在學校學的，還是在學校外面學的？',['在學校學','在學校外面學'],[['數學課',0],['國語課',0],['體育課',0],['參觀博物館',1],['跟奶奶學做菜',1],['才藝班學畫畫',1]],'學校和生活中都有很多學習的機會。')
],
/* ---------- 三上三 班級與我 ---------- */
'3a3-1':[
 M('同學不小心撞到你，馬上跟你說對不起，你可以怎麼說？','沒關係',['推回去','大聲罵他','一整天不理他'],'原諒別人的不小心，大家相處更愉快。'),
 M('你不小心弄壞同學的鉛筆盒，應該怎麼做？','誠實道歉，想辦法彌補',['假裝不知道','說是別人弄的','偷偷藏起來'],'做錯事勇敢承認、道歉，才能得到別人的信任。'),
 M('看到有同學一個人孤單地坐著，你可以怎麼做？','邀請他一起玩',['在旁邊笑他','叫大家不要理他','偷拍他傳給別人'],'一個友善的邀請，可能讓他開心一整天。'),
 M('兩個同學在吵架，比較好的處理方式是什麼？','請他們冷靜，各自說出想法，需要時找老師',['在旁邊起鬨','幫其中一個人打架','拍影片傳給大家'],'冷靜下來好好說，問題才有辦法解決。'),
 T('好朋友之間也可能意見不同，這時候可以好好溝通。',true,'意見不同很正常，說出想法、也聽聽對方的。'),
 T('幫同學取難聽的綽號很好玩，沒關係。',false,'難聽的綽號會讓人難過，這也是一種霸凌。'),
 M('和同學一起合作做事，要做到什麼？','尊重彼此的意見',['只聽自己的','把工作都丟給別人','搶別人的功勞'],'合作要互相尊重、一起負責。'),
 M('同學送你一張自己畫的卡片，你應該怎麼做？','說謝謝',['丟到垃圾桶','說畫得好醜','假裝沒看到'],'收到別人的心意，要說謝謝。'),
 M('有人在網路上說同學的壞話，你可以怎麼做？','不跟著轉傳，告訴老師或家長',['跟著按讚','再多罵幾句','轉傳給更多人'],'不轉傳、不跟著罵，還要讓大人知道，才能幫助被欺負的人。'),
 S('這些行為，好朋友會做嗎？',['好朋友會做','不應該做'],[['分享',0],['互相幫忙',0],['說謝謝和對不起',0],['嘲笑別人',1],['搶別人的東西',1],['說別人的壞話',1]],'用友善的方式相處，班上每個人都會更快樂。')
],
'3a3-2':[
 P('把幹部和他的工作配對起來',[['班長','帶領全班、協助老師'],['衛生股長','督促打掃、保持整潔'],['風紀股長','提醒大家守秩序'],['體育股長','帶操、管理球具']],'每個幹部都有自己的責任，大家分工讓班級更好。'),
 M('負責提醒大家打掃、檢查教室乾不乾淨的是哪一位幹部？','衛生股長',['體育股長','學藝股長','總務股長'],'衛生股長負責班上的整潔。'),
 M('負責帶大家做體操、管理球具的是哪一位幹部？','體育股長',['衛生股長','風紀股長','學藝股長'],'體育股長負責體育課和運動器材。'),
 M('負責管理班費的是哪一位幹部？','總務股長',['風紀股長','體育股長','衛生股長'],'總務股長負責班費和班上的物品。'),
 M('負責佈置教室、整理布告欄的是哪一位幹部？','學藝股長',['總務股長','體育股長','風紀股長'],'學藝股長負責教室佈置和學藝活動。'),
 M('開班會時，負責主持會議的人叫做什麼？','主席',['記錄','觀眾','裁判'],'主席負責主持會議、讓大家輪流發言。'),
 M('開班會時，把大家討論的內容寫下來的人叫做什麼？','記錄',['主席','校長','班長'],'記錄把會議內容寫下來，大家才記得決定了什麼。'),
 M('在班會上想發言，應該怎麼做？','先舉手，主席同意後再說',['直接大聲插話','跟旁邊的人聊天','站到椅子上喊'],'舉手發言，會議才會有秩序。'),
 M('大家意見不同時，班會常用什麼方法做決定？','舉手表決，少數服從多數',['誰最大聲就聽誰的','猜拳決定','只聽班長的'],'表決是公平的方法，也要尊重少數人的意見。'),
 T('表決結果出來後，就算不是自己選的，也要遵守大家的決定。',true,'尊重大家共同的決定，是民主的精神。'),
 O('開班會的順序，排排看',['主席宣布開會','討論事項','舉手表決','主席宣布散會'],'有順序地開會，才能好好討論、做出決定。'),
 T('班級公約是全班一起討論訂出來的，大家都要遵守。',true,'自己參與訂定的規則，更要以身作則。'),
 M('當選班級幹部，應該抱持什麼態度？','負責任，為大家服務',['可以命令同學','不用做事','只管自己'],'幹部是為大家服務，不是用來管人的。')
],
/* ---------- 三上四 學校與我 ---------- */
'3a4-1':[
 M('拔河比賽要贏，最重要的是什麼？','全隊一起用力、互相配合',['一個人用力就好','一直說別人不行','偷偷放手'],'團結合作，力量才會最大。'),
 M('比賽輸了，好的態度是什麼？','恭喜對手，檢討後再加油',['生氣摔東西','怪隊友','說對方作弊'],'有運動家精神，輸了也能學到東西。'),
 M('比賽贏了，好的態度是什麼？','謝謝隊友，也尊重對手',['嘲笑對方','一直炫耀','不理隊友'],'贏了不驕傲，才是真正的贏家。'),
 T('公平的競爭可以讓大家一起進步。',true,'在公平的規則下比賽，能激勵每個人變得更好。'),
 M('小組報告時，有人找資料、有人畫圖、有人上台報告，這是什麼？','分工合作',['互相競爭','吵架','偷懶'],'每個人負責一部分，一起完成，就是合作。'),
 M('大隊接力交接棒時，要怎麼做？','和隊友配合好時機',['自己跑自己的','故意慢慢跑','把棒子丟過去'],'接力賽靠的是隊友之間的默契。'),
 S('這些事情是「合作」還是「競爭」？',['合作','競爭'],[['一起打掃教室',0],['小組做報告',0],['一起搬桌子',0],['賽跑比賽',1],['演講比賽',1],['跳繩比賽',1]],'合作是一起完成目標；競爭是在規則下比比看誰比較好。'),
 T('為了贏，可以故意絆倒對手。',false,'不守規則、傷害別人，就失去了比賽的意義。'),
 M('一起合作時意見不同，可以怎麼辦？','好好討論，找出大家都能接受的方法',['生氣離開','罵人','自己做自己的'],'討論可以讓想法變得更好。')
],
'3a4-2':[
 M('班上有坐輪椅的同學，大家一起玩的時候可以怎麼做？','選大家都能一起玩的遊戲',['不讓他參加','笑他走路不方便','假裝沒看到他'],'想一想怎麼讓每個人都能參加，就是尊重。'),
 T('男生也可以學跳舞，女生也可以踢足球。',true,'興趣不分男生女生，每個人都可以做自己喜歡的事。'),
 T('皮膚顏色不同的人，就應該被不一樣地對待。',false,'每個人都應該被公平對待，不因為外表不同而有差別。'),
 M('新同學說話有不同的口音，你可以怎麼做？','友善地和他聊天、認識他',['學他說話取笑他','不跟他玩','叫他不要說話'],'每個人的成長背景不同，互相認識才會變成好朋友。'),
 M('「尊重」別人是什麼意思？','接納每個人不一樣的地方',['只跟和自己一樣的人玩','笑別人不一樣','要大家都跟我一樣'],'每個人都不一樣，接納彼此的不同就是尊重。'),
 M('戴助聽器的同學上課時，大家可以怎麼幫忙？','說話清楚，面對他說',['在他後面大叫','拿走他的助聽器','不跟他說話'],'面對面清楚地說，他更容易聽清楚。'),
 M('每個小朋友都有權利上學、讀書，這叫做什麼權利？','學習權',['隱私權','投票權','工作權'],'兒童有受教育、學習的權利。'),
 M('小朋友可以在班會上說出自己的想法，這是什麼權利？','表意權',['學習權','隱私權','工作權'],'表意權就是表達自己意見的權利。'),
 M('沒有經過同意，偷看別人的日記，這樣侵犯了什麼權利？','隱私權',['學習權','表意權','遊戲權'],'每個人都有不被偷看、不被公開的私人空間。'),
 M('有人碰你的身體，讓你覺得不舒服，你可以怎麼做？','大聲說「不要」，離開並告訴信任的大人',['忍耐不說','覺得是自己的錯','幫他保守秘密'],'你的身體是你自己的，不舒服就說不，並告訴爸媽或老師。'),
 M('遇到被欺負、權利被侵害時，可以找誰幫忙？','老師、家長或其他信任的大人',['自己忍耐','誰都不要說','去欺負別人'],'勇敢說出來，大人會幫助你。'),
 P('把權利和例子配對起來',[['上學讀書','學習權'],['說出自己的想法','表意權'],['日記不被偷看','隱私權'],['拒絕不舒服的碰觸','身體自主權']],'兒童有很多權利，也要記得尊重別人的權利。')
],
'3a4-3':[
 P('把需要和學校的地方配對起來',[['受傷了','健康中心'],['想借書','圖書館'],['心情不好想找人聊聊','輔導室'],['上體育課','操場']],'學校裡每個地方都有它的功能。'),
 M('在學校跌倒受傷了，應該去哪裡？','健康中心',['圖書館','教務處','操場'],'健康中心有護理師可以幫你處理傷口。'),
 M('負責守校門、維護學校安全的是誰？','警衛',['校長','廚工','學生'],'警衛伯伯守護校門，讓大家安全上學。'),
 M('中午的營養午餐，是誰煮的？','廚房的工作人員',['校長','警衛','同學'],'廚工阿姨每天辛苦地為大家準備午餐。'),
 M('帶領整個學校、負責學校大小事的是誰？','校長',['警衛','廚工','志工'],'校長是學校的領導者。'),
 M('早上在校門口指揮交通，讓大家安全過馬路的是誰？','導護老師和愛心志工',['消防員','醫生','廚工'],'導護老師和志工守護大家的上學路。'),
 T('學校裡有很多做不同工作的人，大家分工合作，學校才能順利運作。',true,'老師、護理師、警衛、廚工、志工，每個人都很重要。'),
 M('為什麼說學校是一個「小社會」？','有很多人分工合作，也有大家要遵守的規則',['因為校園很大','因為有操場','因為要上課'],'就像社會一樣，學校裡有不同的角色和規則。'),
 M('在圖書館要遵守哪一個規則？','保持安靜、愛惜書本',['大聲聊天','在書上畫畫','邊看書邊吃東西'],'安靜和愛惜書本，才能讓每個人都好好閱讀。'),
 S('這些東西是大家共用的，還是自己的？',['大家共用的公物','自己的私人物品'],[['操場',0],['圖書館的書',0],['教室的桌椅',0],['自己的鉛筆盒',1],['自己的水壺',1],['自己的書包',1]],'公物是大家共用的，要更加愛惜。'),
 T('學校的公物壞了沒關係，反正不是自己的。',false,'公物是大家的，愛惜公物，大家才能一直使用。')
],
/* ---------- 三上 主題探究 讓班級更美好 ---------- */
'3ax-1':[
 O('想讓班級更美好，做事的順序排排看',['發現班上的問題','全班一起討論方法','分工合作去做','檢討做得好不好'],'先找出問題、討論、行動，最後檢討改進。'),
 M('班上的掃具常常亂丟，可以怎麼改善？','一起討論，訂出放掃具的位置和規則',['都不要管它','罵最後用的人','把掃具丟掉'],'大家一起想辦法、一起遵守，問題才會真正解決。'),
 M('想讓教室更漂亮，可以怎麼做？','大家一起佈置，展示同學的作品',['只讓老師做','在牆上亂畫','把垃圾堆在角落'],'每個人出一份力，教室就會變成大家喜歡的地方。'),
 T('讓班級更美好，只是班長一個人的責任。',false,'班級是大家的，每個人都可以出一份力。'),
 M('做完改善計畫後，為什麼還要檢討？','看看哪裡做得好、哪裡還能更好',['為了罵人','沒有原因','為了拖時間'],'檢討能讓下一次做得更好。'),
 S('這些想法，會讓班級更美好嗎？',['會更好','不會更好'],[['主動幫忙同學',0],['下課把桌椅排整齊',0],['輪流照顧班上的植物',0],['把垃圾丟在地上',1],['上課大聲吵鬧',1],['弄壞公物',1]],'好習慣一點一滴累積，班級就會越來越好。')
],
/* ---------- 四上一 家鄉的自然環境 ---------- */
'4a1-1':[
 M('地圖上的指北針，箭頭通常指向哪一個方位？','北方',['南方','東方','西方'],'指北針的箭頭指向北方，看地圖先找它。'),
 M('一般地圖是「上北下南」，那麼地圖的右邊是哪一個方位？','東方',['西方','南方','北方'],'上北、下南、左西、右東。'),
 M('地圖上說明各種符號代表什麼的地方，叫做什麼？','圖例',['比例尺','指北針','標題'],'看圖例就知道每個符號代表學校、醫院還是公園。'),
 M('地圖上的比例尺，可以幫我們知道什麼？','地圖上的距離代表實際有多遠',['今天的天氣','家鄉有多少人','現在幾點'],'比例尺把真實的距離縮小畫在地圖上。'),
 M('台中市在台灣的哪一個部分？','中部',['北部','南部','東部'],'台中市位在台灣的中部。'),
 M('台灣四面都是海，是一座什麼？','島嶼',['半島','大陸','沙漠'],'四面被海包圍的陸地叫島嶼。'),
 M('太陽每天從哪一個方位升起？','東方',['西方','南方','北方'],'太陽從東方升起、西方落下，可以用來判斷方位。'),
 M('學校在家的北邊，從家出發去學校要往哪一個方位走？','北方',['南方','東方','西方'],'目的地在哪一邊，就往哪一邊走。'),
 T('用手機的地圖 App 也能查到家鄉的位置。',true,'電子地圖可以放大縮小，還能規劃路線。'),
 M('介紹家鄉的位置時，可以說明什麼？','在哪個縣市，附近有哪些地方',['我最喜歡吃什麼','我的身高','今天星期幾'],'說出縣市、區，以及附近的山、河或大地方，別人就知道在哪裡。'),
 O('地方的範圍，由大排到小',['台灣','台中市','我住的區','我住的社區'],'台灣包含很多縣市，縣市裡有很多區，區裡又有很多社區。')
],
'4a1-2':[
 I('哪一張是「平原」？','plain',['mt','hill','plat'],'平原地勢平坦又低，適合種稻、蓋房子。'),
 I('哪一張是「山地」？','mt',['plain','basin','hill'],'山地又高又陡，有很多森林。'),
 I('哪一張是「盆地」？','basin',['plat','mt','plain'],'盆地四周被山圍住，中間比較低平，像一個臉盆。'),
 I('哪一張是「台地」？','plat',['hill','basin','mt'],'台地頂部平平的，邊緣是陡坡，像一張桌子。'),
 I('哪一張是「丘陵」？','hill',['mt','plat','plain'],'丘陵是起伏不大的小山，常用來種茶和果樹。'),
 M('四周比較高、中間比較低平的地形，叫做什麼？','盆地',['台地','平原','丘陵'],'台中市區就位在台中盆地裡。'),
 M('地勢平坦、適合種稻和建城市的地形是什麼？','平原',['山地','丘陵','台地'],'平原交通方便、容易耕種，常常人口最多。'),
 M('地勢很高、坡很陡，有很多森林的地形是什麼？','山地',['平原','盆地','台地'],'台灣中間有很多高山，就是山地。'),
 M('頂部平平的，周圍是陡坡的地形叫做什麼？','台地',['盆地','丘陵','平原'],'台地像一張大桌子，桌面平、四邊陡。'),
 M('為什麼平原的人口常常比較多？','地勢平坦，方便耕種、蓋房子和交通',['因為比較冷','因為山很多','因為沒有水'],'住在平原，生活和工作都比較方便。'),
 T('台灣有很多高山，山地和丘陵占了大部分的面積。',true,'台灣大約三分之二是山地和丘陵，平原主要在西部。'),
 P('把地形和它的特色配對起來',[['山地','又高又陡'],['平原','平坦又低'],['盆地','四周高、中間低'],['台地','頂部平、邊緣陡']],'記住每種地形的樣子，看到地圖就能認出來。')
],
'4a1-3':[
 M('夏天到秋天，常帶來強風和豪雨的天氣是什麼？','颱風',['寒流','梅雨','乾旱'],'颱風帶來強風豪雨，要做好防颱準備。'),
 M('每年五、六月連續下好幾天雨，叫做什麼？','梅雨',['颱風','寒流','冰雹'],'梅雨季正好是梅子成熟的時候。'),
 M('冬天冷空氣南下，氣溫突然變得很低，叫做什麼？','寒流',['颱風','梅雨','熱浪'],'寒流來時要注意保暖。'),
 M('颱風快來了，家裡應該怎麼準備？','準備手電筒和飲用水，收好陽台的東西',['去海邊看大浪','出門爬山','什麼都不做'],'防颱準備做得好，才能減少危險和損失。'),
 M('寒流來的時候要怎麼做？','多穿衣服保暖',['穿短袖','洗冷水澡','開冷氣'],'穿暖一點，特別要照顧家裡的長輩。'),
 M('台灣的用水，很多來自哪裡？','水庫和河川',['直接喝海水','冰箱','沙漠'],'雨水流進河川、存進水庫，再經過自來水廠處理。'),
 M('水庫最主要的功能是什麼？','把水存起來，提供大家使用',['養恐龍','停車','種稻子'],'水庫在雨多時存水，缺水時就能供應。'),
 M('刷牙時，省水的好習慣是什麼？','用杯子裝水，關掉水龍頭',['讓水一直流','刷很久很久','用水管沖'],'一個小習慣，每天就能省下很多水。'),
 T('台灣雨量很多，所以水用不完，不需要節約用水。',false,'台灣的雨集中在某些季節，河川又短又急，水很快就流進海裡，所以要珍惜水。'),
 S('這些是節約用水，還是浪費水？',['節約用水','浪費水'],[['洗澡用淋浴',0],['洗菜的水拿來澆花',0],['水龍頭漏水趕快修',0],['刷牙時讓水一直流',1],['用水管沖地板很久',1],['水龍頭沒關緊',1]],'珍惜每一滴水，從生活小地方做起。'),
 M('天氣很熱的夏天，要注意什麼？','多喝水，避免中暑',['中午在大太陽下跑步','都不喝水','穿很多件衣服'],'天氣熱容易中暑，要多喝水、避開大太陽。')
],
/* ---------- 四上二 家鄉的傳統住屋與器物 ---------- */
'4a2-1':[
 I('哪一張是閩南式的「三合院」？','h_min',['h_hak','h_stone','h_mud'],'閩南三合院多用紅磚紅瓦，房子圍成ㄇ字形。'),
 I('哪一張是原住民的「石板屋」？','h_stone',['h_min','h_mud','h_hak'],'排灣族、魯凱族用山上的石板蓋房子，冬暖夏涼。'),
 I('哪一張是用泥土磚蓋的「土角厝」？','h_mud',['h_stone','h_min','h_hak'],'土角厝用泥土加稻草做成磚塊，是以前常見的房子。'),
 I('哪一張是客家的「伙房」？','h_hak',['h_min','h_mud','h_stone'],'客家伙房也是合院的形式，是客家大家族住在一起的家。'),
 M('三合院中間的空地叫做「埕」，以前常用來做什麼？','曬穀子、曬衣服、大家聚會',['停飛機','游泳','養魚'],'埕是大家族工作和活動的地方。'),
 M('三合院正中間的廳堂，通常放什麼？','神明和祖先牌位',['廚房','浴室','倉庫'],'正廳是家族祭拜神明和祖先的地方。'),
 M('三合院左右兩邊延伸出去的房子，叫做什麼？','護龍',['騎樓','陽台','地下室'],'家族人口變多時，就在兩邊加蓋護龍。'),
 M('排灣族石板屋的建材，是從哪裡來的？','附近山上的石板',['鋼筋水泥','玻璃','塑膠'],'就地取材，用身邊容易找到的材料蓋房子。'),
 M('以前的傳統住屋，多用當地的材料來蓋，原因是什麼？','就地取材，方便又省錢',['因為比較好看','因為很貴','因為有規定'],'以前交通不方便，用身邊的材料最實在。'),
 M('為什麼現在城市裡多蓋高樓？','人多土地少，往上蓋可以住更多人',['因為比較矮','因為不用電','因為比較好玩'],'城市人口多，蓋高樓可以讓更多人有地方住。'),
 T('以前一個大家族，常常一起住在同一座三合院裡。',true,'三代、四代同住，三合院裡非常熱鬧。')
],
'4a2-2':[
 P('把以前的器物和現在的用品配對起來',[['煤油燈','電燈'],['燒柴的灶','電鍋'],['洗衣板','洗衣機'],['蓑衣和斗笠','雨衣和雨傘']],'器物越來越方便，但用途其實很像。'),
 M('以前還沒有電燈，晚上用什麼照明？','煤油燈或蠟燭',['手電筒','LED 燈','路燈'],'煤油燈點火就能發光，是以前晚上的好幫手。'),
 M('以前煮飯，常用什麼？','燒柴的灶',['電磁爐','微波爐','電鍋'],'灶要先生火、加柴，煮飯很辛苦。'),
 M('以前下雨天，農夫穿什麼擋雨？','蓑衣和斗笠',['雨衣','羽絨外套','西裝'],'蓑衣用棕櫚葉等材料做成，斗笠可以遮雨遮陽。'),
 M('石磨以前用來做什麼？','把米或豆子磨成漿',['洗衣服','照明','寫字'],'用石磨磨米漿，可以做粿和豆漿。'),
 M('扁擔是用來做什麼的？','挑東西',['煮飯','照明','睡覺'],'把東西掛在扁擔兩頭，挑在肩上走。'),
 M('為什麼很多老器物現在比較少用了？','有了電器和新產品，更方便省力',['因為老器物太新','因為規定不能用','因為老器物會飛'],'科技進步，生活用品也一直改變。'),
 T('老器物可以讓我們了解以前人們怎麼生活。',true,'每一件老器物都藏著以前生活的故事。'),
 M('想看看以前的老器物，可以去哪裡？','文物館、博物館，或問家裡的長輩',['便利商店','加油站','銀行'],'長輩家裡可能還留著以前用過的東西喔。'),
 O('照明的工具，從以前排到現在',['油燈','煤油燈','電燈泡','LED 燈'],'照明工具越來越亮、越來越省電。'),
 S('這些東西，是以前常用還是現在常用？',['以前常用','現在常用'],[['灶',0],['洗衣板',0],['煤油燈',0],['電鍋',1],['洗衣機',1],['冰箱',1]],'比一比以前和現在，就能看出生活的改變。')
],
/* ---------- 四上三 家鄉的傳統信仰與老街 ---------- */
'4a3-1':[
 M('台灣很多地方都有媽祖廟，媽祖被認為特別保佑哪些人？','出海捕魚的人和地方平安',['只保佑考試','只保佑動物','沒有保佑任何人'],'以前很多人渡海來台、靠海生活，所以媽祖信仰很普遍。'),
 M('田邊常見的小廟，供奉保佑土地和農作物的神明是誰？','土地公',['媽祖','關公','月下老人'],'土地公又叫福德正神，守護土地和農作。'),
 M('到廟裡參觀時，應該怎麼做？','保持安靜、有禮貌，尊重別人的信仰',['大聲喧嘩','亂摸供品','爬上供桌'],'不管有沒有相同的信仰，都要尊重。'),
 M('台中每年農曆三月，有一個非常盛大的宗教活動，是什麼？','大甲媽祖遶境進香',['划龍舟比賽','放天燈','中秋烤肉'],'大甲媽祖遶境要走好幾天，吸引很多人跟著一起走。'),
 T('台灣有很多不同的宗教信仰，我們要互相尊重。',true,'尊重不同的信仰，社會才能和諧。'),
 M('除了拜拜，廟口常常也是居民做什麼的地方？','聚會、聊天、舉辦活動',['停飛機','考試','睡覺'],'以前的廟口就像社區的活動中心。'),
 M('在廟裡「擲筊」用的是什麼？','一對紅色的筊杯',['骰子','撲克牌','硬幣'],'擲筊是信徒向神明詢問的一種方式。'),
 M('廟宇屋頂上，用碎瓷片拼貼成的彩色裝飾叫做什麼？','剪黏',['油漆','貼紙','壁紙'],'剪黏是很精細的傳統工藝，常做成龍、鳳和花。'),
 M('除了廟宇，社區裡還可能有哪些宗教場所？','教堂等其他宗教的場所',['只有廟宇','沒有任何宗教場所','只有學校'],'台灣有佛教、道教、基督宗教、伊斯蘭教等不同信仰。'),
 M('廟會活動除了信仰，還有什麼意義？','凝聚居民感情、傳承文化',['讓大家吵架','只是製造垃圾','沒有任何意義'],'陣頭、戲曲、熱鬧的活動，都是珍貴的文化。')
],
'4a3-2':[
 M('老街上常見，可以遮陽擋雨的走廊叫做什麼？','騎樓',['陽台','地下道','天橋'],'騎樓讓人下雨天也能逛街、做生意。'),
 M('以前的老街，很多是怎麼形成的？','靠近河港、車站或廟口，人來人往做生意',['隨便亂蓋的','一天就蓋好','為了拍電影'],'人多的地方商店就多，慢慢形成熱鬧的街道。'),
 M('以前的老街上，常有哪些店？','打鐵店、中藥行、糕餅店',['手機店','電腦店','網咖'],'這些老店的手藝，很多傳承了好幾代。'),
 M('現在很多老街變成了什麼？','觀光景點，有小吃和特產',['全部拆光','變成機場','變成大海'],'整修過的老街吸引很多遊客來參觀。'),
 M('逛老街時，好的行為是什麼？','不亂丟垃圾，愛護老建築',['在牆上塗鴉','到處亂丟垃圾','爬上屋頂拍照'],'老建築壞了就很難修復，要一起愛護。'),
 T('老街的老房子記錄了家鄉的歷史，值得好好保存。',true,'保存老街，就是保存家鄉的記憶。'),
 M('有些老街會慢慢沒落，主要原因是什麼？','交通路線改變，人潮變少',['天空變藍了','下雪了','店家太有名'],'像河港淤積、新的道路或車站蓋好，人潮就移到別的地方了。'),
 O('老街的變化，照順序排排看',['商店聚集在河港或道路旁','形成熱鬧的街道','交通改變，慢慢沒落','整修後成為觀光老街'],'老街的興衰，和交通有很大的關係。'),
 M('老街上一些洋樓的正面，有很多精美的雕花裝飾，是哪一種建築風格？','巴洛克式',['太空站式','帳篷式','鐵皮屋'],'台灣很多老街都有巴洛克式的街屋立面。')
],
/* ---------- 四上四 家鄉的作息、節慶與節日 ---------- */
'4a4-1':[
 M('以前的農業社會，人們的作息大多是怎樣？','日出而作、日落而息',['晚上工作白天睡覺','都不用工作','每天看電視'],'以前沒有電燈，跟著太陽作息。'),
 M('以前的農夫安排耕種，常常參考什麼？','農民曆和節氣',['手機','電視節目','電動'],'節氣告訴農夫什麼時候該播種、收成。'),
 M('現代人的作息，主要跟著什麼來安排？','上班、上學的時間',['太陽','月亮','潮水'],'現代人用時鐘安排一天的生活。'),
 M('有了電燈以後，人們的生活有什麼改變？','晚上也能工作或讀書',['只能白天活動','都不睡覺了','沒有任何改變'],'電燈讓晚上也能做很多事。'),
 T('每個人的作息可能不一樣，例如有人需要上夜班。',true,'醫院、超商、工廠都有人在晚上工作。'),
 M('「二十四節氣」最早主要是幫助誰？','農夫安排耕種',['學生考試','司機開車','醫生看病'],'像清明、穀雨、冬至，都是節氣的名字。')
],
'4a4-2':[
 I('哪一張是「端午節」？','f_boat',['f_cny','f_moon','f_lan'],'端午節要划龍舟、吃粽子。'),
 I('哪一張是「中秋節」？','f_moon',['f_boat','f_tomb','f_cny'],'中秋節要賞月、吃月餅和柚子。'),
 I('哪一張是「春節」？','f_cny',['f_ghost','f_moon','f_lan'],'春節是農曆新年，有舞獅、貼春聯、圍爐。'),
 I('哪一張是「元宵節」？','f_lan',['f_moon','f_cny','f_tomb'],'元宵節要提燈籠、吃湯圓，有的地方會放天燈。'),
 I('哪一張是「清明節」？','f_tomb',['f_ghost','f_boat','f_lan'],'清明節要掃墓、祭祖，追思祖先。'),
 I('哪一張是「中元節」？','f_ghost',['f_tomb','f_cny','f_moon'],'中元節要普渡，準備供品祭拜。'),
 P('把節慶和它的食物配對起來',[['春節','年糕'],['元宵節','湯圓'],['端午節','粽子'],['中秋節','月餅']],'每個節慶都有特別的應景食物。'),
 P('把節慶和它的活動配對起來',[['春節','圍爐、拜年'],['元宵節','提燈籠、猜燈謎'],['清明節','掃墓'],['端午節','划龍舟']],'節慶活動代代相傳，是重要的文化。'),
 O('這些節慶在一年中的先後，排排看',['春節','元宵節','端午節','中秋節'],'春節是正月初一，元宵是正月十五，端午是五月初五，中秋是八月十五（都是農曆）。'),
 M('元宵節是農曆幾月幾日？','一月十五日',['五月五日','八月十五日','七月十五日'],'正月十五是新年後第一個月圓的晚上。'),
 M('端午節是農曆幾月幾日？','五月五日',['一月十五日','八月十五日','七月十五日'],'所以端午節也叫五月節。'),
 M('中秋節是農曆幾月幾日？','八月十五日',['五月五日','一月十五日','七月十五日'],'中秋節的月亮又大又圓。'),
 M('清明節主要做什麼？','掃墓、祭祖，追思祖先',['划龍舟','吃月餅','放鞭炮迎新年'],'清明節表達對祖先的感謝和懷念。'),
 T('冬至有吃湯圓的習俗。',true,'冬至吃湯圓，象徵全家團圓，也代表又長大一歲。')
],
'4a4-3':[
 M('每年五月的第二個星期日是什麼節日？','母親節',['父親節','教師節','兒童節'],'母親節可以送卡片、幫忙做家事，謝謝媽媽。'),
 M('台灣的父親節是幾月幾日？','8 月 8 日',['5 月 5 日','9 月 28 日','4 月 4 日'],'「八八」唸起來像「爸爸」。'),
 M('台灣的教師節是幾月幾日？','9 月 28 日',['8 月 8 日','4 月 4 日','10 月 10 日'],'教師節是紀念孔子的生日。'),
 M('台灣的兒童節是幾月幾日？','4 月 4 日',['8 月 8 日','1 月 1 日','9 月 28 日'],'兒童節是屬於小朋友的節日。'),
 M('元旦是幾月幾日？','1 月 1 日',['10 月 10 日','4 月 4 日','12 月 25 日'],'元旦是國曆新年的第一天。'),
 M('國慶日是幾月幾日？','10 月 10 日',['1 月 1 日','8 月 8 日','4 月 4 日'],'十月十日又叫雙十節。'),
 S('這些節日，是看農曆還是看國曆？',['看農曆的傳統節慶','看國曆的現代節日'],[['春節',0],['端午節',0],['中秋節',0],['兒童節',1],['教師節',1],['元旦',1]],'傳統節慶多半看農曆，現代節日多半看國曆。'),
 M('原住民族為了慶祝豐收、感謝祖靈，會舉辦什麼祭典？','豐年祭',['潑水節','聖誕節','萬聖節'],'阿美族的豐年祭有傳統的歌舞，非常熱鬧。'),
 M('客家桐花祭是在什麼時候？','四、五月油桐花開的時候',['十二月下雪的時候','八月中秋的時候','一月過年的時候'],'春末油桐花開，白色的花像雪一樣落滿山路。'),
 M('有些來自泰國、緬甸的新住民朋友，會慶祝哪一個節日？','潑水節',['端午節','豐年祭','冬至'],'潑水節是他們的新年，互相潑水代表祝福。'),
 T('不同族群有不同的節慶，認識和尊重它們，能讓生活更豐富。',true,'台灣是多元文化的社會。'),
 M('母親節的時候，可以怎麼表達感謝？','寫卡片、幫忙做家事',['和媽媽吵架','不理媽媽','亂花錢'],'用行動表達感謝，媽媽會很開心。')
]
};

/* ================= 站點與單元 =================
   wk：學校第幾週開始教；x,y：地圖上島的位置（百分比）；ls：課 */
var MAP={
 3:{img:'map3',sign:[{t:'三年級上學期',x:50,y:4.6},{t:'三年級下學期',x:50,y:53.6}],units:[
  {k:'3a1',s:'a',wk:1,n:'我的家庭',x:25,y:16,ls:[['3a1-1','家庭的組成'],['3a1-2','家庭的功能'],['3a1-3','親人的往來']]},
  {k:'3a2',s:'a',wk:7,n:'學習與成長',x:80,y:16,ls:[['3a2-1','學習的方法'],['3a2-2','多元的學習']]},
  {k:'3a3',s:'a',wk:11,n:'班級與我',x:24,y:35,ls:[['3a3-1','班級裡的人際關係'],['3a3-2','班級的自治活動']]},
  {k:'3a4',s:'a',wk:14,n:'學校與我',x:76,y:35,ls:[['3a4-1','合作與競爭'],['3a4-2','平等與尊重'],['3a4-3','學校是個小社會']]},
  {k:'3ax',s:'a',wk:20,n:'讓班級更美好',x:50,y:13,ly:19.5,tag:'主題探究',ls:[['3ax-1','讓班級更美好']]},
  {k:'3b1',s:'b',wk:1,n:'我們居住的地方',x:24,y:64,ls:[]},
  {k:'3b2',s:'b',wk:7,n:'消費與生活',x:78,y:64,ls:[]},
  {k:'3b3',s:'b',wk:11,n:'消費與選擇',x:24,y:81,ls:[]},
  {k:'3b4',s:'b',wk:14,n:'家鄉的地名與故事',x:78,y:81,ls:[]},
  {k:'3bx',s:'b',wk:20,n:'家鄉特派員',x:50,y:91,ly:88.2,tag:'主題探究',ls:[]}],
  hub:{x:50,y:44,ly:49.6}},
 4:{img:'map4',sign:[{t:'四年級上學期',x:50,y:3},{t:'四年級下學期',x:50,y:56.4}],units:[
  {k:'4a1',s:'a',wk:1,n:'家鄉的自然環境',x:25,y:13,ls:[['4a1-1','家鄉在哪裡'],['4a1-2','家鄉的地形'],['4a1-3','氣候、水資源與生活']]},
  {k:'4a2',s:'a',wk:7,n:'傳統住屋與器物',x:76,y:14,ls:[['4a2-1','傳統住屋與生活'],['4a2-2','器物與生活']]},
  {k:'4a3',s:'a',wk:11,n:'傳統信仰與老街',x:26,y:33,ls:[['4a3-1','信仰與生活'],['4a3-2','老街與生活']]},
  {k:'4a4',s:'a',wk:15,n:'作息、節慶與節日',x:78,y:33,ls:[['4a4-1','生活的作息'],['4a4-2','傳統的節慶'],['4a4-3','現代的節日']]},
  {k:'4b1',s:'b',wk:1,n:'家鄉的產業',x:25,y:64,ls:[]},
  {k:'4b2',s:'b',wk:7,n:'家鄉的人口',x:75,y:64,ls:[]},
  {k:'4b3',s:'b',wk:11,n:'家鄉的交通',x:27,y:84,ls:[]},
  {k:'4b4',s:'b',wk:14,n:'家鄉風情畫',x:75,y:84,ls:[]}],
  hub:{x:50,y:46,ly:51.4}}
};
var UK={};[3,4].forEach(function(g){MAP[g].units.forEach(function(u){u.g=g;UK[u.k]=u;u.ls.forEach(function(l){(BANK[l[0]]||[]).forEach(function(q,i){q.id=l[0]+':'+i;q.lk=l[0]})})})});

var C=null,css=false;
function img(k){return SOCI[k]||''}
function esc(s){return C.esc(String(s))}
function shuf(a,R){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor((R||Math.random)()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function dayN(){try{return C.PGX()?C.PGX()._dayN():Math.floor(Date.now()/864e5)}catch(e){return Math.floor(Date.now()/864e5)}}

/* ----- 孩子的社會資料 k.so = {L:{課:[最佳星,次數,答對,總題]}, w:{題id:[箱,到期日]}, b:{單元:1}} ----- */
function so(id){var k=C.Store.kid(id)||{};return k.so&&typeof k.so==='object'?k.so:{}}
function mut(id,f){C.Store.mut(id,function(k){var o=k.so&&typeof k.so==='object'?k.so:(k.so={});o.L=o.L||{};o.w=o.w||{};o.b=o.b||{};f(o)})}
function lessonStar(id,lk){var r=(so(id).L||{})[lk];return r?+r[0]||0:0}
function unitStars(id,u){var t=0;u.ls.forEach(function(l){t+=lessonStar(id,l[0])});return t}
function unitBadge(id,u){return u.ls.length>0&&u.ls.every(function(l){return lessonStar(id,l[0])>=2})}
function unitMaster(id,u){return u.ls.length>0&&u.ls.every(function(l){return lessonStar(id,l[0])>=3})}

/* ----- 年級與學校進度 ----- */
function gradeOf(id){var g=0;try{g=C.PGX()?C.PGX().grade(id):0}catch(e){}if(!g){var s=String(C.egrade()||'');g='一二三四五六'.indexOf(s)+1}return g}
function mapGrade(id){var g=gradeOf(id);return g>=4?4:3}
function semNow(id){try{var P=C.PGX();if(P){var k=C.Store.kid(id)||{},pg=k.pg&&typeof k.pg==='object'?k.pg:{};return P.sem(new Date(),pg.s2)}}catch(e){}var t=new Date(),a=new Date(2026,7,31);return {s:'a',wk:Math.max(1,Math.floor((t-a)/864e5/7)+1)}}
function taught(id,u){var s=semNow(id),mg=mapGrade(id),g=gradeOf(id);
  if(g>u.g)return true;if(g<u.g&&!(g<3&&u.g===3))return false;
  if(u.s==='a')return s.s==='b'||s.wk>=u.wk;return s.s==='b'&&s.wk>=u.wk}
function cap(){return 3}
/* 學校教到的都開；另外可以超前，最多 3 個單元，而且前面的單元都要熟練（每課 3 顆星） */
function openState(id,u){if(!u.ls.length)return 'build';if(!C.isKid())return 'open';if(taught(id,u))return 'open';
  var list=MAP[u.g].units.filter(function(x){return x.ls.length}),i=list.indexOf(u),ahead=0;
  for(var j=0;j<i;j++){var x=list[j];if(!unitMaster(id,x))return 'lock';if(!taught(id,x))ahead++}
  return ahead<cap()?'ahead':'lock'}
function curUnit(id){var g=mapGrade(id),c=null;MAP[g].units.forEach(function(u){if(u.ls.length&&u.tag!=='主題探究'&&taught(id,u))c=u});return c}

/* ----- 錯題複習（隔 1／3／7／14 天） ----- */
var IV=[0,1,3,7,14];
function dueList(id,units){var w=so(id).w||{},d=dayN(),out=[];for(var q in w){var r=w[q];if(!Array.isArray(r))continue;var lk=q.split(':')[0];if(units&&units.indexOf(lk.split('-')[0])<0)continue;if((+r[1]||0)<=d)out.push(q)}return out}
function qById(qid){var lk=qid.split(':')[0],i=+qid.split(':')[1];return (BANK[lk]||[])[i]||null}
function markQ(id,q,ok){mut(id,function(o){var r=o.w[q.id];if(ok){if(r){var b=(+r[0]||0)+1;if(b>=IV.length)delete o.w[q.id];else o.w[q.id]=[b,dayN()+IV[b]]}}else o.w[q.id]=[0,dayN()];var ks=Object.keys(o.w);if(ks.length>150)ks.slice(0,ks.length-150).forEach(function(x){delete o.w[x]})})}

/* ================= 樣式 ================= */
function addCss(){if(css)return;css=true;var st=document.createElement('style');st.id='soc-css';st.textContent=[
'.soc{grid-column:1/-1;width:100%;min-width:0;--soc-ink:#1d2b3a;--soc-wood:#8a5a2b;--soc-wood2:#c98b4a;--soc-cream:#fff8ec;--soc-leaf:#2f8f5b;--soc-sky:#e8f4ff;--soc-red:#d9533f;--soc-gold:#f2b632;display:flex;flex-direction:column;gap:14px}',
'.soc-head{display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,#fff3dc,#ffe2b8);border-radius:22px;padding:10px 14px;box-shadow:0 6px 16px rgba(138,90,43,.18);color:var(--soc-ink)}',
'.soc-head img{width:64px;height:64px;object-fit:contain;flex:none;filter:drop-shadow(0 3px 4px rgba(0,0,0,.18))}',
'.soc-head .t{flex:1;min-width:0}.soc-head small{display:block;color:#8a5a2b;font-weight:700;font-size:12.5px}.soc-head b{font-size:19px}',
'.soc-head .bd{flex:none;text-align:center;font-weight:800;color:#8a5a2b;font-size:12px;line-height:1.2}.soc-head .bd img{width:40px;height:40px;display:block;margin:0 auto 2px}',
'.soc-now{display:flex;gap:10px;align-items:center;background:#fff;border:2px dashed #f0c27b;border-radius:16px;padding:8px 12px;color:var(--soc-ink);font-size:14px}.soc-now b{color:#b05a1d}',
'.soc-map{position:relative;width:100%;max-width:640px;margin:0 auto;border-radius:24px;overflow:hidden;box-shadow:0 10px 26px rgba(30,80,140,.25)}',
'.soc-map>img{display:block;width:100%;height:auto}',
'.soc-sign{position:absolute;transform:translate(-50%,-50%);font-weight:900;color:#5b3412;font-size:clamp(13px,3.6vw,19px);letter-spacing:.06em;text-shadow:0 1px 0 #ffe7c2;pointer-events:none;white-space:nowrap}',
'.soc-sign.rib{background:linear-gradient(#c98b4a,#9c6431);color:#fff8ec;text-shadow:0 1px 0 #6b3f17;padding:4px 16px;border-radius:999px;border:2px solid #f6d29b;box-shadow:0 3px 8px rgba(0,0,0,.25)}',
'.soc-hot{position:absolute;transform:translate(-50%,-50%);width:34%;aspect-ratio:1.5;border:0;background:transparent;border-radius:40%;padding:0;cursor:pointer}',
'.soc-hot:focus-visible{outline:4px solid #fff;outline-offset:-4px}',
'.soc-hot.today::after{content:"";position:absolute;inset:8%;border-radius:40%;border:4px solid #ffe66b;box-shadow:0 0 18px 4px rgba(255,230,107,.85);animation:socpulse 1.6s ease-in-out infinite}',
'@keyframes socpulse{0%,100%{opacity:.35;transform:scale(.96)}50%{opacity:1;transform:scale(1.03)}}',
'.soc-lab{position:absolute;transform:translate(-50%,0);border:0;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:1px;background:linear-gradient(#fffaf0,#ffe9c7);color:#5b3412;border-radius:12px;padding:3px 10px 4px;box-shadow:0 3px 0 #b97a3d,0 5px 10px rgba(0,0,0,.22);font-weight:800;font-size:clamp(10.5px,2.5vw,14px);white-space:nowrap;line-height:1.22}',
'.soc-lab small{font-weight:700;font-size:.82em;color:#9b6a35}.soc-lab .st{color:#e7a614;letter-spacing:1px}',
'.soc-lab.lock,.soc-lab.build{background:linear-gradient(#f2f2f2,#dcdcdc);color:#6b6b6b;box-shadow:0 3px 0 #a8a8a8,0 5px 10px rgba(0,0,0,.18)}.soc-lab.lock small,.soc-lab.build small{color:#7d7d7d}',
'.soc-lab.now{background:linear-gradient(#fff6b8,#ffd75e);box-shadow:0 3px 0 #c98f12,0 5px 12px rgba(0,0,0,.25)}',
'.soc-lab.ahead{background:linear-gradient(#e7f7ff,#bfe6ff);box-shadow:0 3px 0 #4f93c9,0 5px 10px rgba(0,0,0,.2)}',
'.soc-lab .tg{font-size:.72em;background:#2f8f5b;color:#fff;border-radius:999px;padding:0 6px;margin-bottom:1px}',
'.soc-lab.got::before{content:"";position:absolute;right:-12px;top:-12px;width:28px;height:28px;background:url(BADGE) center/contain no-repeat}',
'.soc-dim{position:absolute;transform:translate(-50%,-50%);width:30%;aspect-ratio:1.6;border-radius:40%;background:radial-gradient(rgba(60,70,90,.45),rgba(60,70,90,0) 70%);pointer-events:none}',
'.soc-hub{position:absolute;transform:translate(-50%,-50%);width:24%;aspect-ratio:1;border:0;border-radius:50%;background:transparent;cursor:pointer;padding:0}',
'.soc-hubl{position:absolute;transform:translate(-50%,-50%);pointer-events:none;background:#2f6fb5;color:#fff;font-weight:800;font-size:clamp(11px,3vw,14px);padding:3px 10px;border-radius:999px;white-space:nowrap;box-shadow:0 3px 0 #1d4f87,0 5px 10px rgba(0,0,0,.25)}',
'.soc-hub i{position:absolute;right:4%;top:6%;background:#d9533f;color:#fff;font-style:normal;font-weight:900;font-size:12px;min-width:22px;height:22px;border-radius:11px;display:grid;place-items:center;padding:0 5px;box-shadow:0 2px 4px rgba(0,0,0,.3)}',
'.soc-book{background:#fff;border-radius:20px;padding:12px 14px;box-shadow:0 4px 14px rgba(0,0,0,.08);color:var(--soc-ink)}',
'.soc-book h3{margin:0 0 8px;font-size:16px}.soc-bdg{display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px}',
'.soc-bdg span{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:12px;font-weight:700;text-align:center;color:#8b8b8b}',
'.soc-bdg span em{position:relative;width:56px;height:56px;display:block}.soc-bdg span em img{width:100%;height:100%;object-fit:contain;filter:grayscale(1) opacity(.35)}',
'.soc-bdg span.on{color:#8a5a2b}.soc-bdg span.on em img{filter:none}.soc-bdg span em b{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-size:12px;color:#8a5a2b;font-weight:900;line-height:1.1;width:70%;text-align:center}',
'.soc-note{color:#5c6b7a;font-size:13.5px;line-height:1.6;margin:0}',
/* 站點頁 */
'.soc-st{display:flex;flex-direction:column;gap:12px;color:var(--soc-ink);background:rgba(255,255,255,.6);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border-radius:24px;padding:12px}',
'.soc-sth{position:relative;display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#e9f6ff,#d4ecff);border-radius:22px;padding:12px 14px;overflow:hidden}',
'.soc-sth img{width:84px;height:84px;object-fit:contain;flex:none}.soc-sth small{color:#2f6fb5;font-weight:800}.soc-sth b{display:block;font-size:21px}.soc-sth span{font-size:13.5px;color:#4b5b6b}',
'.soc-les{display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:0;background:#fff;border-radius:18px;padding:12px 14px;box-shadow:0 3px 0 #e2d2b8,0 6px 14px rgba(0,0,0,.07);cursor:pointer;font:inherit;color:inherit}',
'.soc-les .n{flex:none;width:40px;height:40px;border-radius:50%;background:linear-gradient(#ffd27a,#f2a93b);color:#5b3412;font-weight:900;display:grid;place-items:center;font-size:18px}',
'.soc-les .nm{flex:1;min-width:0}.soc-les .nm b{display:block;font-size:16.5px}.soc-les .nm small{color:#6b7b8a}',
'.soc-les .s3{flex:none;font-size:20px;letter-spacing:1px;color:#ddd}.soc-les .s3 i{font-style:normal}.soc-les .s3 i.on{color:#f2b632}',
'.soc-les:active{transform:translateY(2px)}',
'.soc-rw{display:flex;gap:12px;align-items:center;background:#fff8ec;border-radius:18px;padding:10px 14px;font-size:14px}.soc-rw img{width:54px;height:54px;object-fit:contain}.soc-rw.off img{filter:grayscale(1) opacity(.45)}',
/* 題目 */
'.soc-q{display:flex;flex-direction:column;gap:12px;color:var(--soc-ink);background:rgba(255,255,255,.6);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border-radius:24px;padding:12px}',
'.soc-out{display:flex;flex-direction:column;gap:12px}.soc-out:empty{display:none}',
'.soc-bar{height:10px;background:#e6edf5;border-radius:6px;overflow:hidden}.soc-bar i{display:block;height:100%;background:linear-gradient(90deg,#46b37a,#8bd65c);border-radius:6px;transition:width .3s}',
'.soc-ask{display:flex;align-items:flex-end;gap:8px}.soc-ask img{width:78px;height:78px;object-fit:contain;flex:none;transition:transform .2s}',
'.soc-ask .bub{position:relative;flex:1;background:#fff;border-radius:18px;padding:12px 14px;font-size:clamp(16px,4.4vw,20px);font-weight:700;line-height:1.5;box-shadow:0 4px 12px rgba(0,0,0,.08)}',
'.soc-ask .bub::before{content:"";position:absolute;left:-9px;bottom:16px;border:9px solid transparent;border-right-color:#fff;border-left:0}',
'.soc-ask .ty{display:inline-block;font-size:12px;font-weight:800;color:#fff;background:#2f8f5b;border-radius:999px;padding:1px 8px;margin-bottom:4px}',
'.soc-opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
'.soc-opt{border:0;font:inherit;cursor:pointer;background:#fff;color:var(--soc-ink);border-radius:16px;padding:14px 10px;font-size:clamp(15px,4vw,18px);font-weight:700;box-shadow:0 4px 0 #d8c9ad,0 6px 12px rgba(0,0,0,.06);min-height:62px;line-height:1.35}',
'.soc-opt:active{transform:translateY(3px);box-shadow:0 1px 0 #d8c9ad}',
'.soc-opt.ok{background:#dff6e6;box-shadow:0 4px 0 #57b47a}.soc-opt.no{background:#ffe3df;box-shadow:0 4px 0 #e0705f;animation:socshake .35s}',
'.soc-opt[disabled]{cursor:default}',
'.soc-opt.pic{padding:8px;display:flex;flex-direction:column;align-items:center;gap:4px}.soc-opt.pic img{width:100%;aspect-ratio:1.45;object-fit:contain}.soc-opt.pic span{font-size:14px;min-height:20px}',
'.soc-tf{display:grid;grid-template-columns:1fr 1fr;gap:12px}.soc-tf .soc-opt{font-size:22px;min-height:84px}.soc-tf .soc-opt b{display:block;font-size:34px;line-height:1}',
'@keyframes socshake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
'.soc-sort .cur{align-self:center;background:#fff;border-radius:16px;padding:14px 22px;font-size:22px;font-weight:800;box-shadow:0 4px 0 #d8c9ad;min-width:60%;text-align:center}',
'.soc-bins{display:grid;grid-template-columns:1fr 1fr;gap:10px}.soc-bin{border:0;font:inherit;cursor:pointer;border-radius:18px;padding:10px;min-height:120px;display:flex;flex-direction:column;gap:6px;align-items:center;font-weight:800;font-size:16px;color:#fff}',
'.soc-bin.b0{background:linear-gradient(#5cb3e8,#2f7fc0)}.soc-bin.b1{background:linear-gradient(#f39a6b,#d9653a)}',
'.soc-bin .got{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.soc-bin .got em{font-style:normal;background:rgba(255,255,255,.92);color:#334;border-radius:10px;padding:2px 8px;font-size:13.5px;font-weight:700}.soc-bin .got em.x{background:#ffe3df;color:#b23b2a;text-decoration:line-through}',
'.soc-ord .soc-slots{display:flex;flex-direction:column;gap:6px}.soc-ord .soc-slot{width:100%;box-sizing:border-box;writing-mode:horizontal-tb;display:flex;align-items:center;gap:8px;background:#f1f5f9;border:2px dashed #c8d3de;border-radius:14px;padding:8px 10px;min-height:46px;font-weight:700}',
'.soc-ord .soc-slot i{font-style:normal;flex:none;width:26px;height:26px;border-radius:50%;background:#2f8f5b;color:#fff;display:grid;place-items:center;font-size:14px}',
'.soc-ord .soc-slot.fill{background:#e3f6ea;border-style:solid;border-color:#7cc79a}',
'.soc-pair{display:grid;grid-template-columns:1fr 1fr;gap:8px}.soc-pair .col{display:flex;flex-direction:column;gap:8px}',
'.soc-pair .soc-opt{min-height:54px;padding:10px 8px;font-size:clamp(14px,3.8vw,16.5px)}.soc-pair .soc-opt.sel{background:#fff3c4;box-shadow:0 4px 0 #e0b22d}',
'.soc-pair .soc-opt.done{opacity:.95;background:#dff6e6;box-shadow:0 4px 0 #57b47a}',
'.soc-fb{display:flex;gap:10px;align-items:center;border-radius:18px;padding:10px 12px;animation:socin .25s}.soc-fb.ok{background:#e6f8ec}.soc-fb.no{background:#fff0ec}',
'.soc-fb img{width:72px;height:72px;object-fit:contain;flex:none}.soc-fb b{display:block;font-size:17px}.soc-fb p{margin:2px 0 0;font-size:15px;line-height:1.55}',
'@keyframes socin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
'.soc-next{align-self:center;border:0;font:inherit;cursor:pointer;background:linear-gradient(#ffb547,#f08a24);color:#fff;font-weight:900;font-size:19px;border-radius:999px;padding:12px 40px;box-shadow:0 4px 0 #c0651a,0 8px 16px rgba(240,138,36,.35)}',
'.soc-res{display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;color:var(--soc-ink);padding:6px 0}',
'.soc-res img.l{width:150px;height:150px;object-fit:contain}.soc-res .soc-stars{font-size:46px;letter-spacing:4px;color:#ddd}.soc-res .soc-stars i{font-style:normal}.soc-res .soc-stars i.on{color:#f2b632;text-shadow:0 2px 0 #c98f12}',
'.soc-res h3{margin:0;font-size:22px}.soc-res p{margin:0;color:#4b5b6b}.soc-res .pts{font-size:22px;font-weight:900;color:#e07b17}',
'.soc-res .row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.soc-res .row button{border:0;font:inherit;cursor:pointer;border-radius:999px;padding:11px 22px;font-weight:800;font-size:16px}',
'.soc-res .row .a{background:linear-gradient(#ffb547,#f08a24);color:#fff;box-shadow:0 4px 0 #c0651a}.soc-res .row .b{background:#eef2f7;color:#334;box-shadow:0 4px 0 #c9d2dc}',
'.soc-res .bdgwin{display:flex;align-items:center;gap:10px;background:#fff6dd;border-radius:16px;padding:8px 14px;font-weight:800;color:#8a5a2b}.soc-res .bdgwin img{width:56px;height:56px}',
'.gates.has-soc .gatebtn.sc{grid-column:auto;justify-self:stretch;width:100%}',
'.gatebtn.so .pic{animation-delay:-2.4s}',
'.hero.soc{background:linear-gradient(135deg,#f59a3c,#e0574a)}',
'@media (prefers-reduced-motion:reduce){.soc-hot.today::after{animation:none}.soc-opt.no{animation:none}}'
].join('\n').replace('BADGE',img('badge'));document.head.appendChild(st)}

/* ================= 社會島首頁 ================= */
function home(gb){addCss();var id=C.who(),kid=C.isKid(),g=kid?mapGrade(id):3,m=MAP[g],now=kid?curUnit(id):null,sem=kid?semNow(id):{s:'a',wk:1};
  var nb=0,tot=0;[3,4].forEach(function(gg){MAP[gg].units.forEach(function(u){if(u.ls.length){tot++;if(kid&&unitBadge(id,u))nb++}})});
  var due=kid?dueList(id).length:0;
  var h='<div class="soc">';
  h+='<div class="soc-head"><img src="'+img('lion_wave')+'" alt=""><div class="t"><small>家鄉小鎮・'+(g===3?'三':'四')+'年級社會</small><b>'+(kid?esc(C.kidName())+'，':'')+'今天去哪一站？</b></div><div class="bd"><img src="'+img('badge')+'" alt="">'+nb+' / '+tot+'<br>家鄉徽章</div></div>';
  if(kid&&gradeOf(id)<3)h+='<div class="soc-now">社會課三年級才開始，先來預習看看吧！</div>';
  else if(now)h+='<div class="soc-now"><img src="'+img('compass')+'" alt="" style="width:34px;height:34px"><span>學校現在大約上到 <b>'+esc(now.n)+'</b>（'+(sem.s==='a'?'上':'下')+'學期第 '+sem.wk+' 週）</span></div>';
  h+='<div class="soc-map"><img src="'+img(m.img)+'" alt="'+(g===3?'三':'四')+'年級社會地圖">';
  m.sign.forEach(function(s){h+='<span class="soc-sign'+(g===4?' rib':'')+'" style="left:'+s.x+'%;top:'+s.y+'%">'+esc(s.t)+'</span>'});
  m.units.forEach(function(u){var st=openState(id,u),isNow=now&&now.k===u.k,bd=kid&&unitBadge(id,u),ns=kid?unitStars(id,u):0,mx=u.ls.length*3;
    if(st==='lock'||st==='build')h+='<span class="soc-dim" style="left:'+u.x+'%;top:'+u.y+'%"></span>';
    h+='<button class="soc-hot'+(isNow?' today':'')+'" data-u="'+u.k+'" style="left:'+u.x+'%;top:'+u.y+'%" aria-label="'+esc(u.n)+'"></button>';
    var sub=st==='build'?'建造中':st==='lock'?'還沒教到':mx?('<span class="st">★</span> '+ns+' / '+mx):'';
    h+='<button class="soc-lab '+(st==='open'?'':st)+(isNow?' now':'')+(bd?' got':'')+'" data-u="'+u.k+'" style="left:'+u.x+'%;top:'+(u.ly!=null?u.ly:u.y+7.2)+'%">'+(u.tag?'<span class="tg">'+esc(u.tag)+'</span>':'')+esc(u.n)+'<small>'+(isNow?'學校教到這裡・':st==='ahead'?'可以超前・':'')+sub+'</small></button>'});
  h+='<button class="soc-hub" data-hub="1" style="left:'+m.hub.x+'%;top:'+m.hub.y+'%" aria-label="錯題複習站">'+(due?'<i>'+due+'</i>':'')+'</button><span class="soc-hubl" style="left:'+m.hub.x+'%;top:'+m.hub.ly+'%">錯題複習站</span>';
  h+='</div>';
  h+='<div class="soc-book"><h3>家鄉護照・集徽章</h3><div class="soc-bdg">'+m.units.filter(function(u){return u.ls.length}).map(function(u){var on=kid&&unitBadge(id,u);return '<span class="'+(on?'on':'')+'"><em><img src="'+img('badge')+'" alt=""><b>'+esc(u.n.length>4?u.n.slice(0,4):u.n)+'</b></em>'+esc(u.n)+'</span>'}).join('')+'</div></div>';
  h+='<p class="soc-note">點地圖上的小島開始闖關。每一課答對 7 成以上拿 2 顆星，整站每一課都有 2 顆星就能拿到家鄉徽章；9 成以上拿 3 顆星，還能提早去下一站（最多超前 3 站）。答錯的題目會在「錯題複習站」再出現。</p></div>';
  gb.className='games one';gb.innerHTML=h;
  gb.querySelectorAll('[data-u]').forEach(function(b){b.addEventListener('click',function(){var u=UK[b.dataset.u],st=openState(id,u);
    if(st==='build'){C.sfx('no');C.say('「'+u.n+'」還在建造中，很快就開放！','oops');return}
    if(st==='lock'){C.sfx('no');C.say('「'+u.n+'」學校還沒教到喔！把前面的站都拿到 3 顆星，就能提早去。','oops');return}
    C.sfx('win');try{C.confetti(b,14)}catch(e){}station(u)})});
  var hb=gb.querySelector('[data-hub]');if(hb)hb.addEventListener('click',function(){C.sfx('tap');review()});
  C.say(now?'學校正在上「'+now.n+'」，去那一站練習吧！':'點地圖上的小島開始探險！','happy');
}

/* ================= 站點頁 ================= */
function station(u){var id=C.who();C.shell('社會小鎮');C.title(u.n);var B=C.body();
  var bd=C.isKid()&&unitBadge(id,u);
  var h='<div class="soc soc-st"><div class="soc-sth"><img src="'+img(bd?'lion_cheer':'lion_happy')+'" alt=""><div><small>'+(u.g===3?'三':'四')+'年級'+(u.s==='a'?'上':'下')+'學期'+(u.tag?'・'+esc(u.tag):'')+'</small><b>'+esc(u.n)+'</b><span>'+(bd?'已經拿到家鄉徽章！再玩可以拿更多分數。':'每一課都拿到 2 顆星，就能拿到家鄉徽章。')+'</span></div></div>';
  u.ls.forEach(function(l,i){var s=C.isKid()?lessonStar(id,l[0]):0,n=(BANK[l[0]]||[]).length;
    h+='<button class="soc-les" data-l="'+l[0]+'"><span class="n">'+(i+1)+'</span><span class="nm"><b>第 '+(i+1)+' 課：'+esc(l[1])+'</b><small>'+n+' 題題庫・每次 8 題</small></span><span class="s3">'+[0,1,2].map(function(j){return '<i class="'+(j<s?'on':'')+'">★</i>'}).join('')+'</span></button>'});
  h+='<div class="soc-rw'+(bd?'':' off')+'"><img src="'+img('badge')+'" alt=""><div><b>'+(bd?'已得到「'+esc(u.n)+'」徽章':'過關獎勵：「'+esc(u.n)+'」家鄉徽章')+'</b><br>'+(bd?'收在家鄉護照裡了。':'集滿徽章，家鄉護照就會越來越豐富。')+'</div></div></div>';
  B.innerHTML=h;
  B.querySelectorAll('[data-l]').forEach(function(b){b.addEventListener('click',function(){C.sfx('tap');var lk=b.dataset.l;play(u,lk,buildRound(id,u,lk))})});
  C.say('選一課開始！','happy');
}
function buildRound(id,u,lk){var pool=(BANK[lk]||[]).slice(),N=Math.min(8,pool.length),pick=[];
  if(C.isKid()){var due=dueList(id,[u.k]).map(qById).filter(function(q){return q&&q.lk===lk});shuf(due).slice(0,3).forEach(function(q){pick.push(q)})}
  shuf(pool).forEach(function(q){if(pick.length<N&&pick.indexOf(q)<0)pick.push(q)});return shuf(pick)}
function review(){var id=C.who(),g=C.isKid()?mapGrade(id):3,units=MAP[g].units.filter(function(u){return u.ls.length&&openState(id,u)!=='lock'}),uk=units.map(function(u){return u.k});
  var due=C.isKid()?dueList(id,uk).map(qById).filter(Boolean):[],pick=shuf(due).slice(0,8),extra=[];
  units.forEach(function(u){u.ls.forEach(function(l){(BANK[l[0]]||[]).forEach(function(q){extra.push(q)})})});
  shuf(extra).forEach(function(q){if(pick.length<8&&pick.indexOf(q)<0)pick.push(q)});
  play({k:'rev',n:'錯題複習站',g:g,ls:[],rev:true,due:due.length},null,pick)}

/* ================= 闖關 ================= */
var TY={mc:'選選看',mi:'看圖選',tf:'是非題',sort:'分分看',ord:'排順序',pair:'配配看'};
function play(u,lk,qs){var id=C.who(),B=C.body(),i=0,right=0,pts=0,cur=null;C.shell('社會小鎮');C.title(u.n);
  if(!qs.length){B.innerHTML='<div class="soc"><p class="soc-note">這裡還沒有題目。</p></div>';return}
  function lion(k){return '<img src="'+img(k)+'" alt="">'}
  function next(){if(i>=qs.length)return result();cur=qs[i];C.prog((i+1)+' / '+qs.length);
    var q=cur,h='<div class="soc soc-q"><div class="soc-bar"><i style="width:'+(i/qs.length*100)+'%"></i></div>';
    h+='<div class="soc-ask">'+lion('lion_think')+'<div class="bub"><span class="ty">'+TY[q.t]+'</span><br>'+esc(q.q)+'</div></div><div class="soc-area"></div><div class="soc-out"></div></div>';
    B.innerHTML=h;var A=B.querySelector('.soc-area');
    ({mc:mc,mi:mi,tf:tf,sort:sort,ord:ord,pair:pair})[q.t](q,A);
  }
  function done(ok,bonus){var q=cur;if(ok){right++;var n=bonus?2:1;pts+=n*10;if(C.isKid())C.award(n)}
    if(C.isKid())markQ(id,q,ok);C.sfx(ok?'ok':'no');
    var L=B.querySelector('.soc-ask img');if(L)L.src=img(ok?'lion_happy':'lion_sad');
    var ans='';if(!ok){if(q.t==='mc')ans='答案是「'+q.a+'」。';else if(q.t==='mi')ans='答案是「'+CAP[q.a]+'」。';else if(q.t==='tf')ans='答案是「'+(q.a?'對':'錯')+'」。'}
    var O=B.querySelector('.soc-out');O.innerHTML='<div class="soc-fb '+(ok?'ok':'no')+'">'+lion(ok?'lion_cheer':'lion_sad')+'<div><b>'+(ok?['答對了！','好厲害！','完全正確！','你真棒！'][i%4]:'沒關係，記起來就好！')+'</b><p>'+esc(ans+(q.e||''))+'</p></div></div><button class="soc-next">'+(i+1>=qs.length?'看結果':'下一題')+'</button>';
    O.querySelector('.soc-next').addEventListener('click',function(){C.sfx('tap');i++;next()});
    try{O.scrollIntoView({behavior:'smooth',block:'nearest'})}catch(e){}
    C.say(ok?'答對了！':'再想一想，下次就會了！',ok?'happy':'oops');
  }
  function mc(q,A){var opts=shuf([q.a].concat(q.o));A.innerHTML='<div class="soc-opts">'+opts.map(function(o){return '<button class="soc-opt" data-v="'+esc(o)+'">'+esc(o)+'</button>'}).join('')+'</div>';
    A.querySelectorAll('.soc-opt').forEach(function(b){b.addEventListener('click',function(){var ok=b.dataset.v===q.a;A.querySelectorAll('.soc-opt').forEach(function(x){x.disabled=true;if(x.dataset.v===q.a)x.classList.add('ok')});if(!ok)b.classList.add('no');done(ok)})})}
  function mi(q,A){var opts=shuf([q.a].concat(q.o));A.innerHTML='<div class="soc-opts">'+opts.map(function(o){return '<button class="soc-opt pic" data-v="'+o+'" aria-label="選項"><img src="'+img(o)+'" alt=""><span></span></button>'}).join('')+'</div>';
    A.querySelectorAll('.soc-opt').forEach(function(b){b.addEventListener('click',function(){var ok=b.dataset.v===q.a;A.querySelectorAll('.soc-opt').forEach(function(x){x.disabled=true;x.querySelector('span').textContent=CAP[x.dataset.v]||'';if(x.dataset.v===q.a)x.classList.add('ok')});if(!ok)b.classList.add('no');done(ok)})})}
  function tf(q,A){A.innerHTML='<div class="soc-tf"><button class="soc-opt" data-v="1"><b>○</b>對</button><button class="soc-opt" data-v="0"><b>✕</b>錯</button></div>';
    A.querySelectorAll('.soc-opt').forEach(function(b){b.addEventListener('click',function(){var v=b.dataset.v==='1',ok=v===q.a;A.querySelectorAll('.soc-opt').forEach(function(x){x.disabled=true;if((x.dataset.v==='1')===q.a)x.classList.add('ok')});if(!ok)b.classList.add('no');done(ok)})})}
  function sort(q,A){var items=shuf(q.it),k=0,miss=0;
    A.innerHTML='<div class="soc-sort" style="display:flex;flex-direction:column;gap:12px"><div class="cur"></div><div class="soc-bins">'+q.b.map(function(b,j){return '<button class="soc-bin b'+j+'" data-b="'+j+'">'+esc(b)+'<span class="got"></span></button>'}).join('')+'</div></div>';
    var cu=A.querySelector('.cur');function show(){cu.textContent=items[k][0]}show();
    A.querySelectorAll('.soc-bin').forEach(function(b){b.addEventListener('click',function(){if(k>=items.length)return;var it=items[k],j=+b.dataset.b,ok=j===it[1],tgt=A.querySelector('.soc-bin[data-b="'+it[1]+'"] .got');
      if(!ok){miss++;C.sfx('no');b.classList.remove('shk');void b.offsetWidth;var x=document.createElement('em');x.className='x';x.textContent=it[0];b.querySelector('.got').appendChild(x);setTimeout(function(){x.remove()},700)}else C.sfx('pop');
      var e=document.createElement('em');e.textContent=it[0];tgt.appendChild(e);k++;
      if(k>=items.length){cu.textContent=miss?'錯了 '+miss+' 個':'全部分對了！';A.querySelectorAll('.soc-bin').forEach(function(x){x.disabled=true});done(miss===0,miss===0)}else show()})})}
  function ord(q,A){var it=q.it,sh=shuf(it),k=0,miss=0;while(sh.join()===it.join()&&it.length>1)sh=shuf(it);
    A.innerHTML='<div class="soc-ord" style="display:flex;flex-direction:column;gap:12px"><div class="slots">'+it.map(function(x,j){return '<div class="soc-slot"><i>'+(j+1)+'</i><span></span></div>'}).join('')+'</div><div class="soc-opts">'+sh.map(function(x){return '<button class="soc-opt" data-v="'+esc(x)+'">'+esc(x)+'</button>'}).join('')+'</div></div>';
    var slots=A.querySelectorAll('.soc-slot');
    A.querySelectorAll('.soc-opt').forEach(function(b){b.addEventListener('click',function(){if(b.dataset.v===it[k]){C.sfx('pop');slots[k].classList.add('fill');slots[k].querySelector('span').textContent=it[k];b.disabled=true;b.style.display='none';k++;if(k>=it.length)done(miss===0,miss===0)}
      else{miss++;C.sfx('no');b.classList.remove('no');void b.offsetWidth;b.classList.add('no');setTimeout(function(){b.classList.remove('no')},400)}})})}
  function pair(q,A){var L=shuf(q.pr.map(function(p,j){return [p[0],j]})),R=shuf(q.pr.map(function(p,j){return [p[1],j]})),sel=null,left=q.pr.length,miss=0;
    A.innerHTML='<div class="soc-pair"><div class="col">'+L.map(function(p){return '<button class="soc-opt" data-s="L" data-j="'+p[1]+'">'+esc(p[0])+'</button>'}).join('')+'</div><div class="col">'+R.map(function(p){return '<button class="soc-opt" data-s="R" data-j="'+p[1]+'">'+esc(p[0])+'</button>'}).join('')+'</div></div>';
    A.querySelectorAll('.soc-opt').forEach(function(b){b.addEventListener('click',function(){if(b.classList.contains('done'))return;
      if(!sel||sel.dataset.s===b.dataset.s){if(sel)sel.classList.remove('sel');sel=b;b.classList.add('sel');C.sfx('tap');return}
      if(sel.dataset.j===b.dataset.j){C.sfx('pop');[sel,b].forEach(function(x){x.classList.remove('sel');x.classList.add('done');x.disabled=true});sel=null;left--;if(!left)done(miss===0,miss===0)}
      else{miss++;C.sfx('no');var s0=sel;s0.classList.remove('sel');b.classList.add('no');s0.classList.add('no');setTimeout(function(){b.classList.remove('no');s0.classList.remove('no')},400);sel=null}})})}
  function result(){C.prog('');var n=qs.length,pc=right/n,st=pc>=0.9?3:pc>=0.7?2:pc>=0.4?1:0,id2=C.who(),newBadge=false,bonus=0;
    if(C.isKid()){var before=u.ls.length&&unitBadge(id2,u);
      if(lk)mut(id2,function(o){var r=o.L[lk]||[0,0,0,0];o.L[lk]=[Math.max(+r[0]||0,st),(+r[1]||0)+1,(+r[2]||0)+right,(+r[3]||0)+n];if(unitBadge(id2,u))o.b[u.k]=1});
      newBadge=!before&&u.ls.length&&unitBadge(id2,u);bonus=C.finishBonus(right,n)||0}
    var h='<div class="soc soc-res"><img class="l" src="'+img(st>=2?'lion_cheer':st===1?'lion_happy':'lion_sad')+'" alt=""><div class="soc-stars">'+[0,1,2].map(function(j){return '<i class="'+(j<st?'on':'')+'">★</i>'}).join('')+'</div>';
    h+='<h3>'+(st===3?'太厲害了！':st===2?'做得很好！':st===1?'有進步喔！':'再試一次吧！')+'</h3><p>'+n+' 題答對 '+right+' 題'+(u.rev?'・錯題複習完成':'')+'</p><div class="pts">+'+(pts+bonus)+' 分'+(bonus?'（含每日獎勵 '+bonus+'）':'')+'</div>';
    if(newBadge)h+='<div class="bdgwin"><img src="'+img('badge')+'" alt="">拿到「'+esc(u.n)+'」家鄉徽章！</div>';
    else if(!u.rev&&st<2)h+='<p>答對 7 成（6 題）以上就能拿到 2 顆星。</p>';
    h+='<div class="row"><button class="a" id="socAgain">再玩一次</button>'+(u.rev?'':'<button class="b" id="socSt">回到這一站</button>')+'<button class="b" id="socMap">回地圖</button></div></div>';
    B.innerHTML=h;C.sfx('win');try{C.confetti(B.querySelector('.soc-stars'),st*12+6)}catch(e){}
    B.querySelector('#socAgain').addEventListener('click',function(){C.sfx('tap');if(u.rev)review();else play(u,lk,buildRound(C.who(),u,lk))});
    var sb=B.querySelector('#socSt');if(sb)sb.addEventListener('click',function(){C.sfx('tap');station(u)});
    B.querySelector('#socMap').addEventListener('click',function(){C.sfx('tap');C.goHome()});
    C.say(newBadge?'恭喜拿到家鄉徽章！':st>=2?'做得很好！':'多練習幾次就會了！','happy');
  }
  next();
}

/* ================= 對外 ================= */
global.SocialFactory=function(ctx){C=ctx;addCss();
  return {home:home,station:station,review:review,img:img,version:'15.0.0',
    stats:function(){var n=0;for(var k in BANK)n+=BANK[k].length;return {lessons:Object.keys(BANK).length,questions:n}},
    _bank:BANK,_map:MAP,_open:openState,_units:UK};
};
})(window);
