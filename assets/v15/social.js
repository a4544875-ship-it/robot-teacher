/* v15 社會島「家鄉小鎮」：三、四年級社會，跟著學校進度開站、五種題型、錯題複習、家鄉徽章 */
(function(global){
'use strict';
var SOCI=/*SOCI*/{"lion_happy":"assets/img/soc-lion_happy-c2a7f1f4f8.webp","lion_think":"assets/img/soc-lion_think-1996204adf.webp","lion_cheer":"assets/img/soc-lion_cheer-cb1be585de.webp","lion_wow":"assets/img/soc-lion_wow-d545234ea5.webp","lion_wave":"assets/img/soc-lion_wave-38ec812ce7.webp","lion_sad":"assets/img/soc-lion_sad-60c7fd8461.webp","badge":"assets/img/soc-badge-11504690d7.webp","compass":"assets/img/soc-compass-12c5bb8ec9.webp","chest":"assets/img/soc-chest-268dae370f.webp","h_min":"assets/img/soc-h_min-d9a0d8fa7d.webp","h_hak":"assets/img/soc-h_hak-3fb26a0928.webp","h_stone":"assets/img/soc-h_stone-d048a0c2e0.webp","h_mud":"assets/img/soc-h_mud-28d6309c61.webp","f_cny":"assets/img/soc-f_cny-b45bf5f278.webp","f_lan":"assets/img/soc-f_lan-97375759ae.webp","f_tomb":"assets/img/soc-f_tomb-947a2cc5cf.webp","f_boat":"assets/img/soc-f_boat-29ce85c536.webp","f_ghost":"assets/img/soc-f_ghost-efa076323b.webp","f_moon":"assets/img/soc-f_moon-093cf02fc7.webp","gate":"assets/img/soc-gate-268663b1d2.webp","map3":"assets/img/soc-map3-77efd18a1d.webp","map4":"assets/img/soc-map4-dbe2de67eb.webp","a_basket":"assets/img/soc-a_basket-d91c54ac4a.webp","a_cupb":"assets/img/soc-a_cupb-44e03ba50d.webp","a_lamp":"assets/img/soc-a_lamp-aaa7cab237.webp","a_mill":"assets/img/soc-a_mill-f1466f6c34.webp","a_pole":"assets/img/soc-a_pole-ba7e4c0e59.webp","a_radio":"assets/img/soc-a_radio-fcc38ad1f8.webp","a_rain":"assets/img/soc-a_rain-5924d7b003.webp","a_stove":"assets/img/soc-a_stove-4c760ea9a7.webp","a_washb":"assets/img/soc-a_washb-311336f328.webp","ck_date":"assets/img/soc-ck_date-9c897a7e1d.webp","ck_receipt":"assets/img/soc-ck_receipt-469042f472.webp","ck_return":"assets/img/soc-ck_return-cb6e93cd3c.webp","cs_choose":"assets/img/soc-cs_choose-a7019312ac.webp","cs_deliver":"assets/img/soc-cs_deliver-70d89ef56f.webp","cs_list":"assets/img/soc-cs_list-58400e02bd.webp","cs_mpay":"assets/img/soc-cs_mpay-319a221b5b.webp","cs_post":"assets/img/soc-cs_post-c4aee03233.webp","cs_price":"assets/img/soc-cs_price-1e46875724.webp","cs_save":"assets/img/soc-cs_save-adaff2f623.webp","cs_scale":"assets/img/soc-cs_scale-ccd56a54e0.webp","d_dad":"assets/img/soc-d_dad-b017e7cada.webp","d_harvest":"assets/img/soc-d_harvest-7cec5e43a7.webp","d_kids":"assets/img/soc-d_kids-6f8ec71515.webp","d_mom":"assets/img/soc-d_mom-02839ccf8b.webp","d_national":"assets/img/soc-d_national-d2a359e84d.webp","d_newyear":"assets/img/soc-d_newyear-924257cb28.webp","d_teacher":"assets/img/soc-d_teacher-fbde60c30d.webp","d_tung":"assets/img/soc-d_tung-b0866b0dc8.webp","d_water":"assets/img/soc-d_water-ff7acfa6fa.webp","ex_map":"assets/img/soc-ex_map-bdca010d87.webp","ex_story":"assets/img/soc-ex_story-9b940475d2.webp","fam_big":"assets/img/soc-fam_big-d66c51662a.webp","fam_core":"assets/img/soc-fam_core-e6a1fe76e6.webp","fam_grand":"assets/img/soc-fam_grand-77119d2de4.webp","fam_new":"assets/img/soc-fam_new-f7938b4e15.webp","fam_single":"assets/img/soc-fam_single-62375377ba.webp","fam_three":"assets/img/soc-fam_three-b27d16783c.webp","fi_boat":"assets/img/soc-fi_boat-5fbe3c0fb0.webp","fi_cny":"assets/img/soc-fi_cny-8b5788c84f.webp","fi_moon":"assets/img/soc-fi_moon-c18b823ad5.webp","fi_tomb":"assets/img/soc-fi_tomb-6aa8ffcaf8.webp","fn_picnic":"assets/img/soc-fn_picnic-fc42ac0bd2.webp","fn_work":"assets/img/soc-fn_work-6015d0e9e3.webp","g_basin":"assets/img/soc-g_basin-7c8e0923d1.webp","g_beach":"assets/img/soc-g_beach-3d28a85698.webp","g_estuary":"assets/img/soc-g_estuary-4842749fc4.webp","g_hill":"assets/img/soc-g_hill-1e21f065da.webp","g_mt":"assets/img/soc-g_mt-ad9d6f9dec.webp","g_plain":"assets/img/soc-g_plain-4c8db47486.webp","g_plat":"assets/img/soc-g_plat-612e6b0835.webp","g_river":"assets/img/soc-g_river-b6629903c2.webp","g_rock":"assets/img/soc-g_rock-e5d212f952.webp","h_apt":"assets/img/soc-h_apt-ad51351cb7.webp","h_town":"assets/img/soc-h_town-ef56e93800.webp","hm_beach":"assets/img/soc-hm_beach-0c27d94b98.webp","hm_bike":"assets/img/soc-hm_bike-5bef7bb336.webp","hm_court1":"assets/img/soc-hm_court1-800060dbe0.webp","hm_guide":"assets/img/soc-hm_guide-3042b82056.webp","hm_market":"assets/img/soc-hm_market-d2509cb7ef.webp","hm_river":"assets/img/soc-hm_river-7824a3395a.webp","hm_sun":"assets/img/soc-hm_sun-3f0e19e332.webp","i_bento":"assets/img/soc-i_bento-0683bdf257.webp","i_ecobag":"assets/img/soc-i_ecobag-a8bb6a9172.webp","i_fridge":"assets/img/soc-i_fridge-913dbc048e.webp","i_lamp":"assets/img/soc-i_lamp-54281db026.webp","i_mooncake":"assets/img/soc-i_mooncake-43473c9bb6.webp","i_mpay":"assets/img/soc-i_mpay-464ab3c03e.webp","i_niangao":"assets/img/soc-i_niangao-705d4df03d.webp","i_piggy":"assets/img/soc-i_piggy-3e8ec06f90.webp","i_raincoat":"assets/img/soc-i_raincoat-8e8762c90c.webp","i_ricecooker":"assets/img/soc-i_ricecooker-43224b4278.webp","i_ricemill":"assets/img/soc-i_ricemill-47c6c7eb5d.webp","i_runbing":"assets/img/soc-i_runbing-8255c4ebee.webp","i_tangyuan":"assets/img/soc-i_tangyuan-ba85e9dcff.webp","i_washer":"assets/img/soc-i_washer-e0916709d4.webp","i_zongzi":"assets/img/soc-i_zongzi-c113d93eed.webp","ih_berry":"assets/img/soc-ih_berry-ba981506bb.webp","ih_chef":"assets/img/soc-ih_chef-832d91530a.webp","ih_corn":"assets/img/soc-ih_corn-94810a0a2f.webp","ih_crab":"assets/img/soc-ih_crab-7268631b20.webp","ih_fish":"assets/img/soc-ih_fish-738ed3fda1.webp","ih_globe":"assets/img/soc-ih_globe-7b610fd294.webp","ih_helmet":"assets/img/soc-ih_helmet-6ff607aca8.webp","ih_shrimp":"assets/img/soc-ih_shrimp-fc3ee71a19.webp","ih_squid":"assets/img/soc-ih_squid-1e42976c5c.webp","ih_steth":"assets/img/soc-ih_steth-6da5cda8f3.webp","ih_veg":"assets/img/soc-ih_veg-a480c15efa.webp","ii_fruit":"assets/img/soc-ii_fruit-ffc7bfd21e.webp","iv_beacon":"assets/img/soc-iv_beacon-c98c1e5fea.webp","iv_letter":"assets/img/soc-iv_letter-cc6e4e481d.webp","iv_mobile":"assets/img/soc-iv_mobile-d035f98b26.webp","iv_phone":"assets/img/soc-iv_phone-6e18aaad6c.webp","iv_radio":"assets/img/soc-iv_radio-5961ae271d.webp","iv_telegraph":"assets/img/soc-iv_telegraph-3c64d46542.webp","iv_tv":"assets/img/soc-iv_tv-ac3e4086a4.webp","j_busdriver":"assets/img/soc-j_busdriver-cf9bb7ee45.webp","j_cashier":"assets/img/soc-j_cashier-b2e1f64049.webp","j_chef":"assets/img/soc-j_chef-00c8baa67e.webp","j_doctor":"assets/img/soc-j_doctor-55ce3cac7b.webp","j_driver":"assets/img/soc-j_driver-203bbb18ee.webp","j_guide":"assets/img/soc-j_guide-4fd6fc5bf4.webp","j_hotel":"assets/img/soc-j_hotel-a8d0e51e09.webp","j_nurse":"assets/img/soc-j_nurse-cf0e8b654e.webp","j_teacher":"assets/img/soc-j_teacher-a7eb1107b2.webp","k_bag":"assets/img/soc-k_bag-acf60dd776.webp","k_dish":"assets/img/soc-k_dish-f10b6d18fa.webp","k_flower":"assets/img/soc-k_flower-7740be3ef9.webp","k_fold":"assets/img/soc-k_fold-ffdc667030.webp","k_hug":"assets/img/soc-k_hug-7f5a01290c.webp","k_pet":"assets/img/soc-k_pet-95fea9bafa.webp","k_read":"assets/img/soc-k_read-0a2794e881.webp","k_sick":"assets/img/soc-k_sick-84ab25d90f.webp","k_sweep":"assets/img/soc-k_sweep-3d22bc8b31.webp","k_trash":"assets/img/soc-k_trash-c9db75e502.webp","l_ask":"assets/img/soc-l_ask-f740a8bb30.webp","l_baby":"assets/img/soc-l_baby-30aee1c259.webp","l_ball":"assets/img/soc-l_ball-96caff3103.webp","l_dict":"assets/img/soc-l_dict-80a5b131e5.webp","l_flute":"assets/img/soc-l_flute-491931aaa1.webp","l_garden":"assets/img/soc-l_garden-1c7c70083b.webp","l_kinder":"assets/img/soc-l_kinder-6db32329f2.webp","l_lib":"assets/img/soc-l_lib-e9685e2cfc.webp","l_mind":"assets/img/soc-l_mind-04870f26c6.webp","l_museum":"assets/img/soc-l_museum-584d3f8252.webp","l_note":"assets/img/soc-l_note-89bca680f8.webp","l_paint":"assets/img/soc-l_paint-6896f40a66.webp","l_review":"assets/img/soc-l_review-a4db5b3610.webp","l_school":"assets/img/soc-l_school-fe4ea72bb1.webp","l_swim":"assets/img/soc-l_swim-483dee5589.webp","l_web":"assets/img/soc-l_web-bcc8e3be5a.webp","m_1":"assets/img/soc-m_1-13abb82d85.webp","m_10":"assets/img/soc-m_10-275b8a4c93.webp","m_100":"assets/img/soc-m_100-71231890e0.webp","m_1000":"assets/img/soc-m_1000-68ad148e17.webp","m_5":"assets/img/soc-m_5-1a5e9d4e5d.webp","m_50":"assets/img/soc-m_50-639df70852.webp","m_500":"assets/img/soc-m_500-8d7656d95b.webp","n_bike":"assets/img/soc-n_bike-9059e47df1.webp","n_boat":"assets/img/soc-n_boat-c4624fa963.webp","n_can":"assets/img/soc-n_can-e3ba623160.webp","n_chicken":"assets/img/soc-n_chicken-45c24d965f.webp","n_grape":"assets/img/soc-n_grape-702b585dcd.webp","n_pond":"assets/img/soc-n_pond-57f086b9f2.webp","n_rice":"assets/img/soc-n_rice-abc109dd80.webp","n_robot":"assets/img/soc-n_robot-f0bcc4be38.webp","n_tea":"assets/img/soc-n_tea-3539732c81.webp","n_zone":"assets/img/soc-n_zone-7e031868fc.webp","nm_album":"assets/img/soc-nm_album-3b2d542a32.webp","nm_animal":"assets/img/soc-nm_animal-858a436564.webp","nm_change":"assets/img/soc-nm_change-030efa2a09.webp","nm_plant":"assets/img/soc-nm_plant-998f356c0c.webp","nm_shop":"assets/img/soc-nm_shop-2c2cd1bf58.webp","nm_stone":"assets/img/soc-nm_stone-eac604d5b5.webp","nm_story":"assets/img/soc-nm_story-8bf9d6f6f6.webp","nm_terrain":"assets/img/soc-nm_terrain-9b8019939e.webp","nm_tribe":"assets/img/soc-nm_tribe-0db37a9a38.webp","nm_water":"assets/img/soc-nm_water-e55b3e0a73.webp","nw_books":"assets/img/soc-nw_books-477ab078e3.webp","nw_brush":"assets/img/soc-nw_brush-ecb9b5cc0e.webp","nw_clothes":"assets/img/soc-nw_clothes-1866926366.webp","nw_rice":"assets/img/soc-nw_rice-c5ebd180e7.webp","nw_water":"assets/img/soc-nw_water-a56cb42ee7.webp","o_ox":"assets/img/soc-o_ox-526e128fbb.webp","o_raft":"assets/img/soc-o_raft-e7ac21a563.webp","o_rick":"assets/img/soc-o_rick-17457b5279.webp","o_sedan":"assets/img/soc-o_sedan-387344a4ff.webp","p_class":"assets/img/soc-p_class-706e5ec04d.webp","p_elder":"assets/img/soc-p_elder-2946c02831.webp","p_move":"assets/img/soc-p_move-0cf31b1e24.webp","p_new":"assets/img/soc-p_new-98409f8f9e.webp","pf_center":"assets/img/soc-pf_center-9ff602c271.webp","pf_fire":"assets/img/soc-pf_fire-5cc04f7528.webp","pf_hosp":"assets/img/soc-pf_hosp-96fe782cea.webp","pf_lib":"assets/img/soc-pf_lib-09fe5c11b0.webp","pf_market":"assets/img/soc-pf_market-5f7b84dd5b.webp","pf_office":"assets/img/soc-pf_office-75fb8a1769.webp","pf_park":"assets/img/soc-pf_park-aa25387b01.webp","pf_police":"assets/img/soc-pf_police-78d7a6e611.webp","pf_post":"assets/img/soc-pf_post-5c18525f20.webp","pf_station":"assets/img/soc-pf_station-ad009f43e2.webp","pl_city":"assets/img/soc-pl_city-dc86e66804.webp","pl_farm":"assets/img/soc-pl_farm-b8b4beff8a.webp","pl_fish":"assets/img/soc-pl_fish-1c31371087.webp","pl_mount":"assets/img/soc-pl_mount-2299006e25.webp","r_bo":"assets/img/soc-r_bo-32561f6600.webp","r_gu":"assets/img/soc-r_gu-e9bcc08b80.webp","r_jiu":"assets/img/soc-r_jiu-48b1cb13e3.webp","r_nai":"assets/img/soc-r_nai-fb75404f2b.webp","r_shu":"assets/img/soc-r_shu-91bd7e7b31.webp","r_wgong":"assets/img/soc-r_wgong-2e3a41f51b.webp","r_wpo":"assets/img/soc-r_wpo-501ec94daa.webp","r_ye":"assets/img/soc-r_ye-0b9298ec13.webp","r_yi":"assets/img/soc-r_yi-5f5f199d8c.webp","ra_clean":"assets/img/soc-ra_clean-fde50b130c.webp","ra_fair":"assets/img/soc-ra_fair-c8e75e42e0.webp","ra_night":"assets/img/soc-ra_night-fd8d8ae67f.webp","ra_sport":"assets/img/soc-ra_sport-afb302b2d9.webp","ra_volunteer":"assets/img/soc-ra_volunteer-85171c0282.webp","s_cross":"assets/img/soc-s_cross-840ff87166.webp","s_helmet":"assets/img/soc-s_helmet-e6432f671f.webp","s_light":"assets/img/soc-s_light-675eba2afb.webp","sc_award":"assets/img/soc-sc_award-99bb9c510d.webp","sc_body":"assets/img/soc-sc_body-a4d1ecb3b8.webp","sc_friends":"assets/img/soc-sc_friends-1cf7c1da7d.webp","sc_gender":"assets/img/soc-sc_gender-3fe4b3f737.webp","sc_group":"assets/img/soc-sc_group-a2cfe6b325.webp","sc_help":"assets/img/soc-sc_help-3117f8618e.webp","sc_janitor":"assets/img/soc-sc_janitor-f018e85d99.webp","sc_learn":"assets/img/soc-sc_learn-b7a10eff36.webp","sc_privacy":"assets/img/soc-sc_privacy-98a331962c.webp","sc_relay":"assets/img/soc-sc_relay-988d8c42f1.webp","sc_speak":"assets/img/soc-sc_speak-580db4f47e.webp","sc_tug":"assets/img/soc-sc_tug-7747ba7d9b.webp","sc_wheel":"assets/img/soc-sc_wheel-dd4e1b8d29.webp","sh_market":"assets/img/soc-sh_market-9fd74a7858.webp","sh_online":"assets/img/soc-sh_online-a2a824848e.webp","sh_super":"assets/img/soc-sh_super-18ad925cc3.webp","t_censer":"assets/img/soc-t_censer-d60cdcb436.webp","t_church":"assets/img/soc-t_church-54cc64b714.webp","t_door":"assets/img/soc-t_door-d17c051757.webp","t_jian":"assets/img/soc-t_jian-ed48c89c12.webp","t_jiao":"assets/img/soc-t_jiao-86d0f93bec.webp","t_mazu":"assets/img/soc-t_mazu-391cdba1f9.webp","t_tudi":"assets/img/soc-t_tudi-d816526d94.webp","v_bike":"assets/img/soc-v_bike-b2179ffb1a.webp","v_bus":"assets/img/soc-v_bus-f74db6c0fc.webp","v_car":"assets/img/soc-v_car-a9492e8a99.webp","v_hsr":"assets/img/soc-v_hsr-7e3ae276fe.webp","v_mrt":"assets/img/soc-v_mrt-22cfebb158.webp","v_plane":"assets/img/soc-v_plane-cf7cf7939d.webp","v_scooter":"assets/img/soc-v_scooter-16e3eb3e2f.webp","v_ship":"assets/img/soc-v_ship-fa344ed949.webp","v_train":"assets/img/soc-v_train-713cab5eb0.webp","vv_card":"assets/img/soc-vv_card-fe67f074eb.webp","vv_home":"assets/img/soc-vv_home-98a46f2c3e.webp","vv_red":"assets/img/soc-vv_red-86ca7c7969.webp","vv_video":"assets/img/soc-vv_video-bb18c52db2.webp","vv_wedding":"assets/img/soc-vv_wedding-5a26849c80.webp","w_dam":"assets/img/soc-w_dam-45a560a76b.webp","w_drought":"assets/img/soc-w_drought-640206c0f2.webp","w_meiyu":"assets/img/soc-w_meiyu-40cba86753.webp","w_rain":"assets/img/soc-w_rain-ee1f7d7c70.webp","w_tap":"assets/img/soc-w_tap-335b06e7a4.webp","w_typhoon":"assets/img/soc-w_typhoon-74af1df209.webp","ww_bear":"assets/img/soc-ww_bear-0fc88d704b.webp","ww_candy":"assets/img/soc-ww_candy-f729850b76.webp","ww_cards":"assets/img/soc-ww_cards-c5a8dfdf1c.webp","ww_game":"assets/img/soc-ww_game-22e6942d8f.webp","ww_robot":"assets/img/soc-ww_robot-30cf34bfad.webp","ww_shoes":"assets/img/soc-ww_shoes-add3feebb3.webp","cs_check":"assets/img/soc-cs_check-642818c8b5.webp"};

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

/* ===== v15.1 有圖的題目：看圖回答（MP/TP）、看圖選（I）；三下、四下新單元 ===== */
function MP(q,p,a,o,e){var x=M(q,a,o,e);x.p=p;return x}
function TP(q,p,a,e){var x=T(q,a,e);x.p=p;return x}
(function(){var C2={g_mt:'山地',g_hill:'丘陵',g_plat:'台地',g_basin:'盆地',g_plain:'平原',g_river:'河流',g_estuary:'河口',g_beach:'沙灘海岸',g_rock:'岩岸',
 fam_core:'小家庭',fam_three:'三代同堂',fam_single:'單親家庭',fam_grand:'祖孫家庭',fam_new:'新住民家庭',fam_big:'大家族團圓',
 r_ye:'爺爺',r_nai:'奶奶',r_wgong:'外公',r_wpo:'外婆',r_ba:'爸爸',r_ma:'媽媽',r_ge:'哥哥',r_jie:'姊姊',r_di:'弟弟',r_mei:'妹妹',r_bo:'伯伯',r_shu:'叔叔',r_gu:'姑姑',r_yi:'阿姨',r_jiu:'舅舅',
 k_dish:'洗碗',k_sweep:'掃地',k_fold:'摺衣服',k_trash:'倒垃圾',k_flower:'澆花',k_pet:'餵寵物',k_bag:'整理書包',k_lunch:'準備便當',k_shoe:'綁鞋帶',
 l_note:'做筆記',l_dict:'查字典',l_web:'和大人上網查資料',l_ask:'舉手問老師',l_review:'回家複習',l_mind:'畫心智圖',l_flute:'學樂器',l_ball:'球隊練習',l_paint:'畫畫',l_museum:'參觀博物館',l_lib:'圖書館借書',l_garden:'種菜觀察',l_swim:'學游泳',l_baby:'嬰兒',l_kinder:'幼兒園',l_school:'小學生',
 sc_tug:'拔河',sc_relay:'大隊接力',sc_group:'小組報告',sc_award:'比賽頒獎',sc_learn:'學習權',sc_speak:'表意權',sc_privacy:'隱私權',sc_body:'身體自主權',sc_help:'向信任的大人求助',
 pl_city:'城市',pl_farm:'農村',pl_fish:'漁村',pl_mount:'山村',pf_park:'公園',pf_lib:'圖書館',pf_hosp:'醫院',pf_police:'警察局',pf_fire:'消防局',pf_post:'郵局',pf_office:'區公所',pf_market:'市場',pf_station:'火車站',pf_school:'學校',pf_center:'活動中心',pf_garbage:'垃圾車',
 ra_fair:'廟會',ra_sport:'社區運動會',ra_clean:'社區大掃除',ra_night:'夜市',ra_volunteer:'社區志工',
 nw_rice:'白飯',nw_water:'飲用水',nw_clothes:'衣服',nw_shoes:'鞋子',nw_brush:'牙刷牙膏',nw_books:'課本',ww_robot:'玩具機器人',ww_game:'遊戲機',ww_candy:'一大堆糖果',ww_shoes:'第五雙球鞋',ww_cards:'收集卡牌',ww_bear:'大玩偶',
 m_1:'1 元',m_5:'5 元',m_10:'10 元',m_50:'50 元',m_100:'100 元',m_500:'500 元',m_1000:'1000 元',
 sh_market:'傳統市場',sh_super:'超市',sh_online:'網路購物',sh_night:'夜市小吃',sh_cvs:'便利商店',
 h_apt:'現代公寓',h_town:'現代透天厝',a_lamp:'煤油燈',a_stove:'灶',a_washb:'洗衣板',a_hat:'斗笠',a_rain:'蓑衣和斗笠',a_mill:'石磨',a_pole:'扁擔',a_radio:'古早收音機',a_cradle:'竹搖籃',a_cupb:'菜櫥',a_well:'水井',a_basket:'竹籃',a_sieve:'竹篩',a_mortar:'石臼',
 i_lamp:'檯燈',i_washer:'洗衣機',i_ricecooker:'電鍋',i_raincoat:'雨衣',i_fridge:'冰箱',e_rice:'電子鍋',
 i_niangao:'年糕',i_tangyuan:'湯圓',i_runbing:'潤餅',i_zongzi:'粽子',i_mooncake:'月餅柚子',
 fi_cny:'春節',fi_boat:'端午節',fi_moon:'中秋節',fi_tomb:'清明節',d_harvest:'豐年祭',d_tung:'客家桐花祭',d_water:'潑水節',d_mom:'母親節',d_dad:'父親節',d_kids:'兒童節',d_teacher:'教師節',d_national:'國慶日',d_newyear:'跨年元旦',
 t_mazu:'媽祖廟',t_tudi:'土地公廟',t_censer:'香爐',t_jiao:'筊杯',t_door:'門神',t_jian:'剪黏',t_church:'教堂',
 n_rice:'種稻',n_grape:'種葡萄',n_boat:'漁船捕魚',n_pond:'養殖魚塭',n_chicken:'養雞',n_tea:'採茶',n_robot:'機器手臂生產線',n_bike:'組裝腳踏車',n_can:'食品加工',n_zone:'工業區',
 j_cashier:'店員',j_chef:'廚師',j_doctor:'醫生',j_teacher:'老師',j_guide:'導遊',j_busdriver:'公車司機',j_nurse:'護理師',j_hotel:'飯店服務員',j_driver:'貨運司機',
 c_farm:'農夫採草莓',c_pack:'工廠包裝',c_truck:'冷藏車運送',c_store:'商店販賣',c_eat:'買來吃',
 p_move:'搬家',p_class:'學生變少',p_elder:'長輩變多',p_new:'新社區',
 o_ox:'牛車',o_sedan:'轎子',o_raft:'竹筏',o_rick:'人力車',v_bike:'腳踏車',v_scooter:'機車',v_car:'汽車',v_bus:'公車',v_train:'火車',v_hsr:'高鐵',v_mrt:'捷運',v_plane:'飛機',v_ship:'輪船',
 iv_beacon:'烽火台',iv_letter:'寫信',iv_telegraph:'電報',iv_phone:'轉盤電話',iv_radio:'收音機',iv_tv:'電視新聞',iv_mobile:'手機',
 s_light:'紅綠燈',s_cross:'走斑馬線',s_helmet:'戴安全帽',
 hm_river:'大甲溪',hm_sun:'太陽餅',hm_bike:'自行車道',hm_market:'在地市集',hm_beach:'淨灘',hm_guide:'小小導覽員',hm_court1:'古厝',
 nm_terrain:'依地形取名',nm_plant:'依植物取名',nm_animal:'依動物取名',nm_water:'依水利取名',nm_tribe:'依古時聚落取名',nm_shop:'依古時商店取名',
 ii_rice:'稻米',ii_fruit:'水果',ii_fish:'魚',ii_cow:'乳牛',ii_pig:'豬',ii_chicken:'雞',ii_tea:'茶',ii_factory:'工廠',ii_bike:'腳踏車',ii_hospital:'醫院',ii_school:'學校',ii_bus:'公車',ii_postman:'郵差',ii_chef:'廚師',ii_hair:'美髮師',ii_guide:'導遊',ii_stall:'商店',
 ih_conical:'斗笠',ih_helmet:'工地安全帽',ih_chef:'廚師帽',ih_police:'警察帽',ih_steth:'聽診器',ih_laptop:'筆記型電腦',ih_micro:'顯微鏡',ih_globe:'地球儀',ih_rice:'稻米',ih_corn:'玉米',ih_veg:'青菜',ih_berry:'草莓',ih_fish:'魚',ih_shrimp:'蝦子',ih_crab:'螃蟹',ih_clam:'蛤蜊',ih_squid:'花枝',w_tap:'刷牙時關水龍頭',w_typhoon:'颱風',w_drought:'乾旱',w_meiyu:'梅雨',i_piggy:'撲滿',i_ecobag:'環保購物袋',i_mpay:'行動支付',i_bento:'便當',i_ricemill:'碾米機'};
for(var k in C2)CAP[k]=C2[k];})();
function add(k,a){BANK[k]=(BANK[k]||[]).concat(a)}

/* ----- 三上加圖 ----- */
add('3a1-1',[
 I('哪一張是「三代同堂」？','fam_three',['fam_core','fam_single','fam_grand'],'爺爺奶奶、爸爸媽媽和孩子三代住在一起。'),
 I('哪一張是「祖孫家庭」？','fam_grand',['fam_three','fam_core','fam_new'],'由祖父母照顧孫子女。'),
 I('哪一張是「單親家庭」？','fam_single',['fam_big','fam_core','fam_three'],'由爸爸或媽媽其中一位照顧孩子。'),
 I('媽媽的媽媽是誰？選出她的照片。','r_wpo',['r_nai','r_gu','r_yi'],'媽媽的媽媽叫外婆。'),
 I('爸爸的爸爸是誰？選出他的照片。','r_ye',['r_wgong','r_bo','r_shu'],'爸爸的爸爸叫爺爺。'),
 MP('照片裡是媽媽的兄弟，你要叫他什麼？','r_jiu','舅舅',['叔叔','伯伯','爺爺'],'媽媽的兄弟叫舅舅。'),
 MP('照片裡是爸爸的姊妹，你要叫她什麼？','r_gu','姑姑',['阿姨','外婆','媽媽'],'爸爸的姊妹叫姑姑。')]);
add('3a1-2',[
 MP('媽媽在照顧發燒的孩子，這是家庭的哪一種功能？','k_sick','照顧與保護',['休閒娛樂','賺錢生活','教育學習']),
 MP('爸爸陪孩子一起看書，這是家庭的哪一種功能？','k_read','教育學習',['賺錢生活','照顧與保護','休閒娛樂']),
 MP('全家一起到草地野餐，這是家庭的哪一種功能？','fn_picnic','休閒娛樂',['賺錢生活','教育學習','照顧與保護']),
 MP('爸爸媽媽提著公事包出門，這是家庭的哪一種功能？','fn_work','賺錢生活',['休閒娛樂','教育學習','情感支持']),
 MP('媽媽和孩子開心地抱在一起，這是家庭的哪一種功能？','k_hug','情感支持',['賺錢生活','教育學習','休閒娛樂']),
 I('哪一張是在幫忙「摺衣服」？','k_fold',['k_sweep','k_dish','k_flower']),
 I('哪一張是在幫忙「倒垃圾」？','k_trash',['k_pet','k_bag','k_sweep']),
 TP('照片裡的小朋友主動幫忙洗碗，這是分擔家事的好行為。','k_dish',true,'做得到的家事主動幫忙，家人會很開心。')]);
add('3a1-3',[
 MP('照片裡，一家人提著禮物回到鄉下的家，這是在做什麼？','vv_home','過年回老家團圓',['去上學','去搬家','去買菜']),
 MP('照片裡的小朋友正在用平板做什麼？','vv_video','和外婆視訊聊天',['玩遊戲','看卡通','寫功課']),
 MP('照片裡的小朋友向奶奶鞠躬、拿紅包，這時應該說什麼？','vv_red','謝謝奶奶，新年快樂',['怎麼這麼少','我還要','不用說話']),
 TP('照片裡的小朋友畫卡片送給長輩，也是一種親人往來。','vv_card',true),
 MP('照片裡大家在吃喜宴，參加喜宴要注意什麼？','vv_wedding','有禮貌地祝福新人',['在餐廳裡跑來跑去','一直玩手機','大聲吵鬧'])]);
add('3a2-1',[
 I('哪一張是在「查字典」？','l_dict',['l_note','l_review','l_mind']),
 I('哪一張是在「畫心智圖」？','l_mind',['l_note','l_dict','l_web']),
 MP('照片裡的小朋友在做什麼學習方法？','l_ask','舉手問老師',['查字典','畫心智圖','上網查資料']),
 MP('照片裡的小朋友和媽媽一起用電腦，是在做什麼？','l_web','和大人一起上網查資料',['玩遊戲','看影片','網路購物']),
 TP('照片裡的小朋友晚上在檯燈下複習功課，是好的學習習慣。','l_review',true)]);
add('3a2-2',[
 I('哪一張是在「參觀博物館」？','l_museum',['l_lib','l_garden','l_paint']),
 I('哪一張是在「學樂器」？','l_flute',['l_ball','l_swim','l_paint']),
 MP('照片裡的小朋友在觀察菜苗，這是哪一種學習？','l_garden','動手做、觀察大自然',['只在教室裡讀書','看電視','玩手機']),
 I('哪一張是「幼兒園」時期？','l_kinder',['l_baby','l_school','l_swim'],'嬰兒→幼兒園→小學生，一步一步長大。')]);
add('3a3-1',[
 MP('照片裡的同學在做什麼？','sc_friends','手牽手一起開心玩',['在吵架','在排擠別人','在搶東西'],'不同樣子的朋友，一樣可以玩在一起。'),
 MP('小組一起畫海報做報告，這需要什麼？','sc_group','分工合作',['一個人做完','誰都不做','互相吵架'])]);
add('3a4-1',[
 I('哪一張是「拔河比賽」？','sc_tug',['sc_relay','sc_group','sc_award']),
 I('哪一張是「大隊接力」？','sc_relay',['sc_tug','sc_award','sc_group']),
 MP('同學上台領獎盃，台下的同學應該怎麼做？','sc_award','為他鼓掌',['噓他','說他作弊','不理他'])]);
add('3a4-2',[
 MP('照片裡坐輪椅的同學和大家一起傳球，這表現了什麼？','sc_wheel','平等與尊重',['不公平','排擠','歧視']),
 MP('照片裡男生女生都在踢足球，這代表什麼？','sc_gender','興趣不分男生女生',['女生不能踢球','只有男生能玩','運動很危險']),
 I('「日記不被偷看」是哪一種權利？','sc_privacy',['sc_learn','sc_speak','sc_body'],'隱私權保護我們的私人空間。'),
 I('「勇敢說不」是保護哪一種權利？','sc_body',['sc_privacy','sc_learn','sc_speak'],'你的身體是你自己的。'),
 MP('照片裡的小朋友遇到困難，正在做什麼？','sc_help','向信任的大人求助',['自己忍耐','誰都不說','去欺負別人'])]);
add('3a4-3',[
 MP('照片裡的伯伯在修理桌椅，他是學校裡的誰？','sc_janitor','工友',['校長','廚工','護理師'],'工友伯伯讓學校的設備保持好用。')]);

/* ----- 四上加圖 ----- */
add('4a1-2',[
 I('哪一張是「河口」？','g_estuary',['g_river','g_beach','g_rock'],'河流流進大海的地方叫河口，常有水鳥。'),
 I('哪一張是「岩岸」？','g_rock',['g_beach','g_estuary','g_plat'],'岩岸的海邊有很多岩石，浪花很大。'),
 I('哪一張是「沙灘海岸」？','g_beach',['g_rock','g_river','g_plain']),
 MP('照片裡四周有山圍繞、中間平坦有城鎮，是哪一種地形？','g_basin','盆地',['平原','台地','丘陵']),
 MP('照片裡山坡上種滿了茶，是哪一種地形？','g_hill','丘陵',['平原','盆地','山地'],'丘陵起伏不大，很適合種茶。')]);
add('4a1-3',[
 MP('照片裡是什麼天氣？','w_typhoon','颱風',['梅雨','寒流','乾旱']),
 MP('照片裡五、六月連續下雨、繡球花盛開，是什麼季節的雨？','w_meiyu','梅雨',['颱風','寒流','西北雨']),
 MP('照片裡土地乾裂、作物枯黃，是發生了什麼？','w_drought','乾旱',['颱風','水災','寒流']),
 MP('照片裡的建築把水存起來，叫做什麼？','w_dam','水庫',['自來水廠','游泳池','魚塭']),
 TP('照片裡的小朋友用水桶接雨水，可以拿來澆花、沖廁所。','w_rain',true,'雨水回收是很好的省水方法。'),
 I('哪一張是在「節約用水」？','w_tap',['w_typhoon','w_drought','w_meiyu'],'刷牙時關水龍頭，就能省很多水。')]);
add('4a2-1',[
 I('哪一張是「現代公寓」？','h_apt',['h_town','h_min','h_mud']),
 I('哪一張是「現代透天厝」？','h_town',['h_apt','h_hak','h_stone']),
 MP('客家伙房前面常有一個半月形的水池，叫做什麼？','h_hak','半月池',['游泳池','魚塭','水庫'],'半月池可以防火、養魚，也有風水的意義。')]);
add('4a2-2',[
 I('以前晚上用來照明的是哪一個？','a_lamp',['i_lamp','i_washer','i_fridge'],'以前用煤油燈，現在用電燈。'),
 I('以前洗衣服用的是哪一個？','a_washb',['i_washer','a_mill','a_stove'],'以前用洗衣板搓洗，現在用洗衣機。'),
 I('以前煮飯用的是哪一個？','a_stove',['i_ricecooker','a_lamp','a_washb'],'以前燒柴煮飯，現在用電鍋。'),
 I('以前下雨天農夫穿的是哪一個？','a_rain',['i_raincoat','a_basket','a_radio']),
 I('現在洗衣服常用的是哪一個？','i_washer',['a_washb','a_mill','a_pole']),
 MP('照片裡的老器物叫什麼？','a_mill','石磨',['灶','扁擔','菜櫥'],'石磨用來把米或豆子磨成漿。'),
 MP('照片裡的老器物叫什麼？','a_pole','扁擔',['石磨','搖籃','菜櫥'],'扁擔挑在肩上，兩頭掛著東西。'),
 MP('照片裡有紗網的櫃子，以前用來做什麼？','a_cupb','放飯菜，防蒼蠅',['放衣服','放書','放鞋子'],'以前沒有冰箱，用菜櫥收飯菜。'),
 MP('照片裡的老器物叫什麼？','a_radio','收音機',['電視','手機','電腦'],'以前很多人用收音機聽新聞和歌曲。')]);
add('4a3-1',[
 I('哪一張是「土地公廟」？','t_tudi',['t_mazu','t_church','t_censer']),
 I('哪一張是「教堂」？','t_church',['t_mazu','t_tudi','t_door']),
 MP('照片裡的一對紅色東西叫什麼？','t_jiao','筊杯',['骰子','碗','鞋子'],'擲筊是信徒向神明詢問的方式。'),
 MP('照片裡廟門上畫的是什麼？','t_door','門神',['卡通人物','老師','警察'],'門神守護廟宇和家門。'),
 MP('照片裡廟頂上用碎瓷片拼成的龍，叫做什麼工藝？','t_jian','剪黏',['油漆','貼紙','剪紙']),
 MP('照片裡的大銅爐是做什麼用的？','t_censer','插香祭拜',['煮飯','裝水','放垃圾'])]);
add('4a4-2',[
 I('哪一張是「中秋節」？','fi_moon',['fi_boat','fi_cny','fi_tomb']),
 I('哪一張是「端午節」？','fi_boat',['fi_moon','fi_tomb','fi_cny']),
 I('哪一張是「清明節」？','fi_tomb',['fi_cny','fi_moon','fi_boat']),
 I('元宵節要吃哪一個？','i_tangyuan',['i_zongzi','i_mooncake','i_niangao']),
 I('端午節要吃哪一個？','i_zongzi',['i_tangyuan','i_niangao','i_runbing']),
 I('春節常吃的是哪一個？','i_niangao',['i_zongzi','i_mooncake','i_tangyuan'],'年糕象徵「年年高升」。'),
 I('清明節常吃的是哪一個？','i_runbing',['i_mooncake','i_zongzi','i_niangao'],'清明節有吃潤餅的習俗。')]);
add('4a4-3',[
 I('哪一張是「母親節」？','d_mom',['d_dad','d_teacher','d_kids']),
 I('哪一張是「父親節」？','d_dad',['d_mom','d_kids','d_teacher']),
 I('哪一張是「教師節」？','d_teacher',['d_mom','d_dad','d_kids']),
 I('哪一張是原住民的「豐年祭」？','d_harvest',['d_water','d_tung','d_kids']),
 I('哪一張是「潑水節」？','d_water',['d_harvest','d_tung','d_newyear']),
 MP('照片裡白色的花落滿步道，是哪一個活動？','d_tung','客家桐花祭',['豐年祭','潑水節','中秋節']),
 MP('照片裡有國旗和煙火，是哪一個節日？','d_national','國慶日',['兒童節','元宵節','母親節'])]);

/* ----- 三下一 我們居住的地方 ----- */
add('3b1-1',[
 I('哪一張是「城市」？','pl_city',['pl_farm','pl_fish','pl_mount'],'城市高樓多、人多、車多。'),
 I('哪一張是「農村」？','pl_farm',['pl_city','pl_fish','pl_mount'],'農村有很多稻田。'),
 I('哪一張是「漁村」？','pl_fish',['pl_farm','pl_city','pl_mount'],'漁村靠海，有港口和漁船。'),
 I('哪一張是「山村」？','pl_mount',['pl_fish','pl_city','pl_farm'],'山村在山上，常種茶或水果。'),
 M('住在海邊的居民，很多人從事什麼工作？','捕魚',['種茶','開礦','滑雪'],'住的地方的環境，會影響居民的工作和生活。'),
 M('城市和鄉村比起來，城市通常有什麼特色？','人多、車多、高樓多',['田很多','人很少','沒有商店']),
 T('居住地方的自然環境，會影響居民的生活方式。',true),
 M('介紹自己居住的地方，可以說什麼？','附近有哪些重要的地方和特色',['我昨天吃什麼','我喜歡的卡通','我的考試分數']),
 S('這些景色比較常出現在城市還是鄉村？',['城市','鄉村'],[['捷運',0],['百貨公司',0],['高樓大廈',0],['稻田',1],['果園',1],['三合院',1]])]);
add('3b1-2',[
 P('把需要和要去的地方配對起來',[['想借書','圖書館'],['生病了','醫院'],['寄信','郵局'],['搭火車','火車站']]),
 I('東西掉了或遇到危險，可以去哪裡求助？','pf_police',['pf_post','pf_park','pf_lib'],'警察局可以幫助我們維護安全。'),
 I('想寄信、寄包裹，要去哪裡？','pf_post',['pf_hosp','pf_lib','pf_office']),
 I('發生火災時，誰會來幫忙？','pf_fire',['pf_police','pf_post','pf_market']),
 I('想溜滑梯、散步，可以去哪裡？','pf_park',['pf_office','pf_hosp','pf_station']),
 MP('照片裡是辦理各種地方事務的地方，叫做什麼？','pf_office','區公所',['醫院','郵局','車站']),
 MP('照片裡的長輩在哪裡跳舞運動？','pf_center','社區活動中心',['醫院','警察局','郵局']),
 TP('公共設施是大家一起用的，要愛惜。','pf_park',true),
 M('倒垃圾時，可以怎麼做讓社區更乾淨？','做好垃圾分類、資源回收',['把垃圾丟在路邊','把垃圾丟進河裡','亂丟就好'])]);
add('3b1-3',[
 I('哪一張是「廟會」？','ra_fair',['ra_sport','ra_night','ra_clean']),
 I('哪一張是「社區大掃除」？','ra_clean',['ra_fair','ra_volunteer','ra_sport']),
 I('哪一張是「夜市」？','ra_night',['ra_fair','ra_sport','ra_clean']),
 MP('照片裡的志工在幫長輩做什麼？','ra_volunteer','量血壓、關心健康',['打掃廁所','賣東西','教數學']),
 MP('社區舉辦運動會，有什麼好處？','ra_sport','讓鄰居認識彼此、感情更好',['讓大家吵架','製造垃圾','沒有好處']),
 T('參加社區活動，可以認識鄰居、關心居住的地方。',true),
 M('社區要變得更好，需要誰一起努力？','每一位居民',['只有里長','只有警察','不用管'])]);
/* ----- 三下二 消費與生活 ----- */
add('3b2-1',[
 S('這些是「需要」還是「想要」？',['需要','想要'],[['白飯',0],['飲用水',0],['牙刷',0],['遊戲機',1],['一大堆糖果',1],['第五雙球鞋',1]],'需要是生活一定要有的；想要是有了會開心，但沒有也能生活。'),
 I('哪一個是生活中的「需要」？','nw_water',['ww_candy','ww_game','ww_cards']),
 I('哪一個是生活中的「需要」？','nw_clothes',['ww_robot','ww_bear','ww_shoes']),
 I('哪一個是「想要」，不是必需的？','ww_robot',['nw_rice','nw_brush','nw_books']),
 I('哪一個是「100 元」？','m_100',['m_500','m_1000','m_50']),
 I('哪一個是「50 元」硬幣？','m_50',['m_10','m_1','m_5']),
 M('買一個 35 元的麵包，給店員 50 元，要找回多少錢？','15 元',['25 元','5 元','85 元']),
 M('1 張 100 元可以換成幾個 10 元？','10 個',['5 個','100 個','2 個']),
 MP('照片裡是哪一種買東西的地方？','sh_market','傳統市場',['超市','網路購物','便利商店']),
 MP('照片裡的小朋友和爸爸在做什麼？','sh_online','網路購物',['寫功課','看卡通','玩遊戲']),
 M('人們為什麼要消費？','買需要的東西來滿足生活',['因為無聊','為了把錢花光','為了炫耀'])]);
add('3b2-2',[
 MP('照片裡的小朋友把錢存進撲滿，這是在做什麼？','cs_save','儲蓄',['浪費','借錢','消費']),
 MP('照片裡的小朋友在猜要買球還是買書，這時候要想什麼？','cs_choose','自己真正需要什麼',['哪一個比較貴','同學有什麼','隨便選一個']),
 MP('照片裡同樣的洋芋片，一包 35 元、一包 29 元，聰明的做法是？','cs_price','比較價格和份量再決定',['買比較貴的','兩包都買','不看就買']),
 MP('出門買東西前和媽媽列清單，有什麼好處？','cs_list','只買需要的，不亂花錢',['可以買更多','比較好玩','沒有好處']),
 MP('照片裡的天平，一邊是錢、一邊是愛心，代表什麼？','cs_scale','花錢前要衡量值不值得',['錢最重要','愛心可以買','天平壞了']),
 I('想把零用錢存起來，可以用哪一個？','i_piggy',['i_ecobag','i_mpay','i_bento']),
 M('收到 100 元零用錢，下面哪一個是好的使用方法？','先存一部分，再買需要的東西',['馬上全部買糖果','借給陌生人','丟掉']),
 T('想要的東西很多，要先想一想再決定，不用每樣都買。',true),
 O('聰明消費的順序，排排看',['想想需不需要','比較價格和品質','付錢並拿發票','好好使用'])]);
/* ----- 三下三 消費與選擇 ----- */
add('3b3-1',[
 MP('照片裡的媽媽在看牛奶盒的哪裡？','ck_date','有效期限',['顏色','圖案','重量']),
 MP('照片裡店員遞給小朋友的是什麼？','ck_receipt','發票',['紅包','車票','卡片'],'拿發票可以證明買過東西，壞了也比較好換。'),
 MP('買到壞掉的玩具，可以怎麼做？','ck_return','帶著發票去店裡換',['自己丟掉','罵店員','什麼都不做']),
 MP('照片裡的小朋友拿放大鏡看包裝，是在看什麼？','cs_check','成分和期限標示',['包裝顏色','有沒有中獎','卡通圖案']),
 M('買食物前要先看什麼，才不會吃壞肚子？','有效期限',['包裝顏色','廣告明星','盒子大小']),
 T('只要包裝漂亮，就一定是好東西。',false,'要看內容、品質和標示，不要只看包裝。'),
 M('看到廣告說「吃了會變超強」，應該怎麼想？','想一想是不是真的，不要全部相信',['馬上去買','叫爸媽全部買','告訴同學一定是真的'])]);
add('3b3-2',[
 I('出門買東西，帶哪一個比較環保？','i_ecobag',['ww_candy','ww_cards','i_mpay'],'自備購物袋，少用塑膠袋。'),
 I('哪一個是「行動支付」？','i_mpay',['i_piggy','i_ecobag','m_100']),
 MP('照片裡外送員把餐點送到家，這是哪一種新的消費方式？','cs_deliver','外送',['擺地攤','以物易物','種菜']),
 MP('照片裡的小朋友用手機掃碼，是在做什麼？','cs_mpay','用手機付款',['打電話','拍照','玩遊戲']),
 MP('照片裡的小朋友在郵局櫃台做什麼？','cs_post','存錢',['寄信','買菜','看醫生']),
 M('網路購物很方便，要注意什麼？','和大人一起，選可靠的商店',['把密碼告訴別人','看到便宜就買','一次買很多']),
 T('現在可以用手機付錢，所以就可以一直買東西。',false,'付錢的方法變方便，更要想清楚再買。'),
 S('這些是以前就有，還是現在才有的消費方式？',['以前就有','現在才有'],[['傳統市場',0],['擺攤叫賣',0],['用現金付錢',0],['網路購物',1],['手機付款',1],['外送平台',1]])]);
/* ----- 三下四 家鄉的地名與故事 ----- */
add('3b4-1',[
 MP('地名裡有「坑」「崁」「埔」，大多和什麼有關？','nm_terrain','地形',['動物','人名','節日'],'很多地名來自當地的地形，例如山腳、溪邊、平地。'),
 MP('地名裡有「莿桐」「茄苳」「林」，大多和什麼有關？','nm_plant','植物',['商店','節日','地形']),
 MP('「鹿港」「鹿谷」這些地名，可能和什麼有關？','nm_animal','以前那裡有很多鹿',['那裡賣鹿肉','鹿是市長','和鹿無關']),
 MP('地名裡有「圳」「陂」，大多和什麼有關？','nm_water','水利設施',['商店','動物','節日'],'圳是灌溉用的水道，陂是蓄水池。'),
 MP('照片裡古早的聚落，有些地名就來自以前住在那裡的什麼人？','nm_tribe','原住民族或早期移民',['外星人','卡通人物','沒有人']),
 MP('有些地名來自古時候的商店或行業，例如「店仔」。照片可能是哪一種由來？','nm_shop','依古時商店取名',['依動物取名','依植物取名','依地形取名']),
 S('這些地名的由來是什麼？',['和地形有關','和植物有關'],[['山腳',0],['坑口',0],['頂埔',0],['莿桐',1],['茄苳腳',1],['竹林',1]]),
 T('很多地名都藏著以前的故事。',true)]);
add('3b4-2',[
 MP('想知道家鄉地名的由來，可以怎麼做？','nm_story','問長輩、查書或上網',['亂猜一個','不用知道','問外國人']),
 MP('照片裡的同一條街，以前和現在有什麼不同？','nm_change','以前是泥土路，現在是柏油路和樓房',['完全一樣','以前比較熱鬧','現在沒有房子']),
 MP('照片裡的老石碑，可以讓我們知道什麼？','nm_stone','家鄉以前發生的事',['今天的天氣','明天的考試','超市的價格']),
 M('「社口」這個地名，常被說是和什麼有關？','以前原住民聚落（社）的出入口',['那裡有很多蛇','那裡賣口罩','沒有原因'],'很多地方的「社」，和以前平埔族聚落有關。'),
 M('探索家鄉地名，可以先準備什麼？','要問的問題和紀錄本',['零食','玩具','遊戲機']),
 O('探索家鄉地名的順序，排排看',['決定想查的地名','訪問長輩、查資料','整理資料','分享給同學'])]);
add('3b4-3',[
 MP('照片裡的阿公在說以前的故事，你可以怎麼做？','nm_story','專心聽，還可以發問',['一直插嘴','走開去玩','說好無聊']),
 MP('照片裡祖孫一起看老相簿，可以了解什麼？','nm_album','家鄉和家族以前的樣子',['今天的新聞','明天的天氣','卡通劇情']),
 MP('照片裡古早的商店街，可以讓我們知道什麼？','nm_shop','以前人們怎麼做生意',['未來的科技','外國的國王','恐龍的生活']),
 T('家鄉的故事可以從長輩、老照片、古蹟裡找到。',true),
 M('家鄉的老故事為什麼值得保存？','讓後代認識家鄉、愛護家鄉',['可以賣錢','因為很無聊','沒有原因'])]);
add('3bx-1',[
 MP('照片裡的小記者在做什麼？','ex_story','訪問長輩、記錄家鄉的故事',['在吵架','在買東西','在打電動']),
 MP('當家鄉特派員，照片裡的地圖可以幫我們做什麼？','ex_map','找到要去探訪的地方',['畫畫','包東西','當扇子']),
 O('當家鄉特派員的順序，排排看',['決定採訪主題','準備問題','去採訪、拍照記錄','整理成報告分享'],'先計畫，再行動，最後分享。'),
 M('訪問長輩時，好的禮貌是什麼？','先打招呼、說明來意，最後說謝謝',['直接問不打招呼','邊玩手機邊問','問完就走']),
 M('拍攝別人的照片前，應該怎麼做？','先問對方同不同意',['偷偷拍','拍完再說','不用問']),
 T('分享報告時，要說清楚資料是從哪裡來的。',true)]);

/* ----- 四下一 家鄉的產業 ----- */
add('4b1-1',[
 I('哪一張是「農業」？','n_rice',['n_robot','j_cashier','n_zone'],'種稻、種水果、種茶都是農業。'),
 I('哪一張是「漁業」？','n_boat',['n_chicken','n_tea','n_bike']),
 I('哪一張是「畜牧業」？','n_chicken',['n_pond','n_grape','n_can'],'養雞、養豬、養牛是畜牧業。'),
 MP('照片裡用打水車養魚的地方叫做什麼？','n_pond','養殖魚塭',['水庫','游泳池','水井']),
 MP('台中大甲、后里一帶有名的水果，照片裡是哪一種？','n_grape','葡萄',['西瓜','香蕉','鳳梨']),
 S('這些是農業、漁業還是畜牧業？',['農業或漁業','畜牧業'],[['種稻',0],['採茶',0],['捕魚',0],['養雞',1],['養豬',1],['養乳牛',1]]),
 I('哪一個是漁業的產品？','ih_crab',['ih_corn','ih_veg','ih_berry']),
 I('哪一個是農業的產品？','ih_corn',['ih_fish','ih_shrimp','ih_squid']),
 M('農業、漁業、畜牧業的共同點是什麼？','直接從大自然取得產品',['在工廠製造','提供服務','在網路上賣']),
 T('農漁畜牧業會受到天氣很大的影響。',true,'颱風、乾旱都會影響收成。')]);
add('4b1-2',[
 MP('照片裡的機器手臂在做什麼？','n_robot','在工廠自動化生產',['在種田','在捕魚','在煮飯']),
 MP('照片裡的工人在組裝什麼？','n_bike','腳踏車',['汽車','電視','衣服'],'台中有很多腳踏車和精密機械工廠。'),
 MP('照片裡把番茄做成罐頭，是哪一種工業？','n_can','食品加工',['紡織','鋼鐵','電子']),
 MP('很多工廠集中在一起的地方，叫做什麼？','n_zone','工業區',['住宅區','風景區','學區']),
 M('工業和農業最大的不同是什麼？','工業把原料加工成產品',['工業在田裡工作','工業不用機器','工業只賣水果']),
 T('工廠排放廢水、廢氣，可能汙染環境，所以要好好處理。',true),
 O('從稻子到便當，排排看',['農夫種稻','碾米廠把稻穀變白米','做成便當','我們買來吃'],'農業的產品，經過加工，再透過商店賣給我們。'),
 I('把稻穀變成白米，要用哪一台機器？','i_ricemill',['i_washer','i_ricecooker','i_fridge'])]);
add('4b1-3',[
 I('照片裡的人在醫院照顧病人，他是？','j_nurse',['j_chef','j_cashier','j_guide']),
 I('哪一張是「導遊」？','j_guide',['j_teacher','j_busdriver','j_hotel']),
 I('哪一張是「公車司機」？','j_busdriver',['j_driver','j_chef','j_doctor']),
 P('把職業和用品配對起來',[['醫生','聽診器'],['廚師','廚師帽'],['警察','警察帽'],['工地工人','安全帽']]),
 I('醫生看病會用到哪一個？','ih_steth',['ih_chef','ih_helmet','ih_globe']),
 M('提供服務來滿足別人需要的工作，叫做什麼？','服務業',['農業','工業','漁業'],'店員、老師、醫生、司機都是服務業。'),
 S('這些工作是工業還是服務業？',['工業','服務業'],[['組裝腳踏車',0],['工廠生產線',0],['食品加工',0],['店員',1],['老師',1],['導遊',1]]),
 O('草莓從果園到我們手上，排排看',['農夫採草莓','工廠包裝','冷藏車運送','商店販賣'],'一樣東西要經過很多人的分工合作，才到我們手上。'),
 T('各行各業的人分工合作，讓生活更方便。',true)]);
/* ----- 四下二 家鄉的人口 ----- */
add('4b2-1',[
 M('人口比較多的地方，通常有什麼條件？','地勢平坦、交通方便、工作機會多',['很高的山上','沒有路','沒有水']),
 I('哪一張的人口通常比較多？','pl_city',['pl_mount','pl_farm','pl_fish'],'城市工作機會多，人口比較集中。'),
 M('台灣人口最多的地方，大多分布在哪裡？','西部平原',['中央山脈','東部海岸山脈','離島'],'西部平原地勢平坦、交通方便。'),
 T('高山地區因為交通不方便，人口比較少。',true),
 M('人口太集中在城市，可能會造成什麼問題？','交通擁擠、房價變高',['人變少','沒有商店','空氣變乾淨'])]);
add('4b2-2',[
 MP('照片裡的一家人在搬家，人口移到別的地方叫做什麼？','p_move','人口遷移',['人口增加','出生','觀光'],'很多人為了工作或讀書，搬到城市。'),
 MP('照片裡教室只剩很少學生，是什麼現象？','p_class','少子化',['高齡化','人口增加','觀光'],'出生的小孩變少，叫少子化。'),
 MP('照片裡公園裡很多長輩在運動，是什麼現象？','p_elder','高齡化',['少子化','都市化','工業化'],'老年人的比例越來越高，叫高齡化。'),
 MP('照片裡新蓋的社區，搬家公司忙進忙出，代表什麼？','p_new','人口移入，人變多',['人口變少','沒有人住','學校關門']),
 M('為什麼很多年輕人從鄉村搬到城市？','城市工作機會比較多',['城市空氣比較好','鄉村沒有學校','城市比較安靜']),
 M('面對高齡化，社區可以做什麼？','設立長輩關懷據點、活動中心',['不理長輩','關掉醫院','把長輩送走']),
 S('這些是少子化還是高齡化帶來的現象？',['少子化','高齡化'],[['學校班級變少',0],['玩具店客人變少',0],['新生兒變少',0],['長照中心變多',1],['老人活動中心變多',1],['需要更多看護',1]])]);
/* ----- 四下三 家鄉的交通 ----- */
add('4b3-1',[
 O('這些交通工具，從以前到現在排排看',['牛車','人力車','汽車','高鐵'],'交通工具越來越快、越來越方便。'),
 I('以前的人搭什麼過河？','o_raft',['v_ship','v_plane','v_mrt']),
 I('哪一個是以前的交通工具？','o_sedan',['v_hsr','v_mrt','v_scooter']),
 I('哪一個跑得最快、最適合長距離旅行？','v_plane',['v_bike','o_ox','v_scooter']),
 I('哪一張是「高鐵」？','v_hsr',['v_train','v_mrt','v_bus']),
 I('哪一張是「捷運」？','v_mrt',['v_hsr','v_train','v_bus']),
 MP('照片裡是什麼交通工具？','o_rick','人力車',['牛車','轎子','腳踏車']),
 M('交通變方便以後，生活有什麼改變？','去遠的地方更快，貨物運送也更方便',['大家都不出門','東西變少','沒有改變']),
 S('這些交通工具，是以前的還是現在的？',['以前的','現在的'],[['牛車',0],['轎子',0],['竹筏',0],['捷運',1],['高鐵',1],['飛機',1]]),
 I('過馬路要走哪裡？','s_cross',['s_light','s_helmet','v_car'],'過馬路要走斑馬線，看清楚紅綠燈。'),
 MP('照片裡的小朋友坐機車前在做什麼？','s_helmet','戴好安全帽',['戴帽子遮太陽','玩遊戲','吃東西']),
 MP('紅綠燈亮紅燈時，行人應該怎麼做？','s_light','停下來等',['趕快跑過去','邊看手機邊走','跟著別人闖'])]);
add('4b3-2',[
 O('傳遞訊息的方法，從以前到現在排排看',['烽火台','寫信','轉盤電話','手機'],'訊息傳遞越來越快。'),
 I('古時候用點火冒煙來傳遞消息的是哪一個？','iv_beacon',['iv_letter','iv_mobile','iv_tv']),
 I('哪一個是以前打電話用的？','iv_phone',['iv_mobile','iv_radio','iv_telegraph']),
 I('哪一個是「電報機」？','iv_telegraph',['iv_phone','iv_radio','iv_tv'],'電報用長短的訊號傳遞文字。'),
 I('哪一個可以同時打電話、傳訊息、上網？','iv_mobile',['iv_phone','iv_radio','iv_letter']),
 MP('照片裡的主播在報新聞，這是哪一種傳遞訊息的方式？','iv_tv','電視',['寫信','烽火','電報']),
 M('現在有了網路，傳遞訊息有什麼改變？','可以馬上把訊息傳到世界各地',['變得很慢','只能寫信','不能傳照片']),
 T('網路上的訊息不一定都是真的，要查證。',true),
 M('在網路上看到可怕的謠言，應該怎麼做？','先查證，不要隨便轉傳',['馬上轉傳給所有人','全部相信','加油添醋再傳'])]);
/* ----- 四下四 家鄉風情畫 ----- */
add('4b4-1',[
 MP('台中有一條從山上流下來的大河，照片裡是哪一條？','hm_river','大甲溪',['淡水河','高屏溪','濁水溪'],'大甲溪流經台中，提供灌溉和發電用水。'),
 MP('照片裡的老房子是古早的合院，叫做什麼？','hm_court1','古厝',['公寓','百貨公司','車站'],'古厝記錄了家鄉以前的生活。'),
 MP('照片裡一家人騎著腳踏車，是在哪裡？','hm_bike','自行車道',['高速公路','鐵軌','機場']),
 M('介紹家鄉的風貌，可以介紹什麼？','山、河、老街、古蹟和景點',['我的考試分數','卡通人物','電動遊戲']),
 T('家鄉的風貌，會隨著時間慢慢改變。',true)]);
add('4b4-2',[
 MP('照片裡是台中很有名的特產，叫做什麼？','hm_sun','太陽餅',['鳳梨酥','月餅','麻糬'],'太陽餅是台中有名的伴手禮。'),
 MP('照片裡的市集賣的是什麼？','hm_market','在地的蔬菜水果',['手機','衣服','汽車']),
 M('特產為什麼常常和當地的環境有關？','因為氣候、土壤適合種出那種作物',['因為廣告很多','因為價格便宜','沒有關係']),
 I('台中大甲、后里一帶有名的水果是哪一個？','n_grape',['ii_fruit','ih_corn','ih_berry']),
 M('買家鄉特產當禮物，有什麼好處？','支持在地農民和店家',['讓別人生氣','浪費錢','沒有好處'])]);
add('4b4-3',[
 MP('照片裡的小朋友在海邊做什麼？','hm_beach','淨灘，撿垃圾',['挖沙玩','游泳','釣魚']),
 MP('照片裡的小朋友在古厝前做什麼？','hm_guide','當小小導覽員介紹家鄉',['在吵架','在吃東西','在睡覺']),
 M('愛護家鄉，我們可以做什麼？','不亂丟垃圾、愛護古蹟、參加社區活動',['在古蹟上塗鴉','把垃圾丟進河裡','什麼都不做']),
 T('愛護家鄉只是大人的事，小朋友不用管。',false,'每個人都可以為家鄉出一份力。'),
 O('想讓家鄉更美好，做事的順序排排看',['發現家鄉的問題','想想能做什麼','和大家一起行動','分享成果'])]);
(function(){var AL={mt:'g_mt',hill:'g_hill',plat:'g_plat',basin:'g_basin',plain:'g_plain'};for(var k in BANK)BANK[k].forEach(function(q){if(q.t==='mi'){if(AL[q.a])q.a=AL[q.a];q.o=q.o.map(function(x){return AL[x]||x})}})})();
/* ================= 站點與單元 =================
   wk：學校第幾週開始教；x,y：地圖上島的位置（百分比）；ls：課 */
var MAP={
 3:{img:'map3',sign:[{t:'三年級上學期',x:50,y:4.6},{t:'三年級下學期',x:50,y:53.6}],units:[
  {k:'3a1',s:'a',wk:1,n:'我的家庭',pic:'fam_three',x:25,y:16,ls:[['3a1-1','家庭的組成'],['3a1-2','家庭的功能'],['3a1-3','親人的往來']]},
  {k:'3a2',s:'a',wk:7,n:'學習與成長',pic:'l_lib',x:80,y:16,ls:[['3a2-1','學習的方法'],['3a2-2','多元的學習']]},
  {k:'3a3',s:'a',wk:11,n:'班級與我',pic:'sc_group',x:24,y:35,ls:[['3a3-1','班級裡的人際關係'],['3a3-2','班級的自治活動']]},
  {k:'3a4',s:'a',wk:14,n:'學校與我',pic:'sc_tug',x:76,y:35,ls:[['3a4-1','合作與競爭'],['3a4-2','平等與尊重'],['3a4-3','學校是個小社會']]},
  {k:'3ax',s:'a',wk:20,n:'讓班級更美好',pic:'sc_friends',x:50,y:13,ly:19.5,tag:'主題探究',ls:[['3ax-1','讓班級更美好']]},
  {k:'3b1',s:'b',wk:1,n:'我們居住的地方',pic:'pl_city',x:24,y:64,ls:[['3b1-1','認識居住的地方'],['3b1-2','居住地方的生活'],['3b1-3','地方的居民活動']]},
  {k:'3b2',s:'b',wk:7,n:'消費與生活',pic:'sh_market',x:78,y:64,ls:[['3b2-1','人人有消費'],['3b2-2','聰明的消費']]},
  {k:'3b3',s:'b',wk:11,n:'消費與選擇',pic:'sh_super',x:24,y:81,ls:[['3b3-1','消費停看聽'],['3b3-2','消費改變生活']]},
  {k:'3b4',s:'b',wk:14,n:'家鄉的地名與故事',pic:'nm_change',x:78,y:81,ls:[['3b4-1','地名的由來'],['3b4-2','探索家鄉地名'],['3b4-3','家鄉的故事']]},
  {k:'3bx',s:'b',wk:20,n:'家鄉特派員',x:50,y:91,ly:88.2,pic:'ex_story',tag:'主題探究',ls:[['3bx-1','家鄉特派員']]}],
  hub:{x:50,y:44,ly:49.6}},
 4:{img:'map4',sign:[{t:'四年級上學期',x:50,y:3},{t:'四年級下學期',x:50,y:56.4}],units:[
  {k:'4a1',s:'a',wk:1,n:'家鄉的自然環境',pic:'g_basin',x:25,y:13,ls:[['4a1-1','家鄉在哪裡'],['4a1-2','家鄉的地形'],['4a1-3','氣候、水資源與生活']]},
  {k:'4a2',s:'a',wk:7,n:'傳統住屋與器物',pic:'h_min',x:76,y:14,ls:[['4a2-1','傳統住屋與生活'],['4a2-2','器物與生活']]},
  {k:'4a3',s:'a',wk:11,n:'傳統信仰與老街',pic:'t_mazu',x:26,y:33,ls:[['4a3-1','信仰與生活'],['4a3-2','老街與生活']]},
  {k:'4a4',s:'a',wk:15,n:'作息、節慶與節日',pic:'fi_cny',x:78,y:33,ls:[['4a4-1','生活的作息'],['4a4-2','傳統的節慶'],['4a4-3','現代的節日']]},
  {k:'4b1',s:'b',wk:1,n:'家鄉的產業',pic:'n_rice',x:25,y:64,ls:[['4b1-1','農、漁、畜牧業'],['4b1-2','工業'],['4b1-3','服務業']]},
  {k:'4b2',s:'b',wk:7,n:'家鄉的人口',pic:'p_move',x:75,y:64,ls:[['4b2-1','人口的分布'],['4b2-2','人口的變化']]},
  {k:'4b3',s:'b',wk:11,n:'家鄉的交通',pic:'v_train',x:27,y:84,ls:[['4b3-1','家鄉的運輸'],['4b3-2','訊息的傳遞']]},
  {k:'4b4',s:'b',wk:14,n:'家鄉風情畫',pic:'hm_river',x:75,y:84,ls:[['4b4-1','家鄉的風貌'],['4b4-2','家鄉的特產'],['4b4-3','愛我家鄉']]}],
  hub:{x:50,y:46,ly:51.4}}
};
var UK={};[3,4].forEach(function(g){MAP[g].units.forEach(function(u){u.g=g;UK[u.k]=u;u.ls.forEach(function(l){(BANK[l[0]]||[]).forEach(function(q,i){q.id=l[0]+':'+i;q.lk=l[0]})})})});

var C=null,css=false;
function img(k){return SOCI[k]||''}
/* Artifact 版：圖片打包成一個檔，進社會島時才載入 */
var BST=0,BQ=[];
function ready(cb){var u=global.__SOC_BUNDLE_URL;if(!u||BST===2)return cb();BQ.push(cb);if(BST===1)return;BST=1;
  var sc=document.createElement('script');sc.src=u;sc.async=true;
  sc.onload=function(){var D=global.__SOC_IMG||{};for(var k in D)SOCI[k]=D[k];BST=2;var q=BQ;BQ=[];q.forEach(function(f){try{f()}catch(e){console.error(e)}})};
  sc.onerror=function(){BST=0;var q=BQ;BQ=[];q.forEach(function(f){try{f()}catch(e){}})};document.head.appendChild(sc)}
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
'.soc-qpic{align-self:center;width:min(100%,360px);border-radius:18px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);background:#fff}.soc-qpic img{display:block;width:100%;max-height:34vh;object-fit:contain;background:#fff}',
'.soc-stpic{border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.12)}.soc-stpic img{display:block;width:100%;height:210px;object-fit:contain}',
'.soc-opt.pic{padding:8px;display:flex;flex-direction:column;align-items:center;gap:4px;background:#fff}.soc-opt.pic img{width:100%;aspect-ratio:1.2;object-fit:contain;border-radius:10px}.soc-opt.pic span{font-size:14px;min-height:20px}',
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
function home(gb){if(global.__SOC_BUNDLE_URL&&BST!==2){gb.className='games one';gb.innerHTML='<div class="soc"><p class="soc-note" style="text-align:center;padding:40px 0">家鄉小鎮載入中…</p></div>';return ready(function(){home(gb)})}addCss();var id=C.who(),kid=C.isKid(),g=kid?mapGrade(id):3,m=MAP[g],now=kid?curUnit(id):null,sem=kid?semNow(id):{s:'a',wk:1};
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
  var h='<div class="soc soc-st">'+(u.pic?'<div class="soc-stpic"><img src="'+img(u.pic)+'" alt=""></div>':'')+'<div class="soc-sth"><img src="'+img(bd?'lion_cheer':'lion_happy')+'" alt=""><div><small>'+(u.g===3?'三':'四')+'年級'+(u.s==='a'?'上':'下')+'學期'+(u.tag?'・'+esc(u.tag):'')+'</small><b>'+esc(u.n)+'</b><span>'+(bd?'已經拿到家鄉徽章！再玩可以拿更多分數。':'每一課都拿到 2 顆星，就能拿到家鄉徽章。')+'</span></div></div>';
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
    var q=cur,h='<div class="soc soc-q'+(q.p?' haspic':'')+'"><div class="soc-bar"><i style="width:'+(i/qs.length*100)+'%"></i></div>';
    h+='<div class="soc-ask">'+lion('lion_think')+'<div class="bub"><span class="ty">'+TY[q.t]+'</span><br>'+esc(q.q)+'</div></div>'+(q.p?'<div class="soc-qpic"><img src="'+img(q.p)+'" alt=""></div>':'')+'<div class="soc-area"></div><div class="soc-out"></div></div>';
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
    _bank:BANK,_cap:CAP,_map:MAP,_open:openState,_units:UK};
};
})(window);
