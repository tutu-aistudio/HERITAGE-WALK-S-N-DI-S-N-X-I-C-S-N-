import { LocationItem, Badge } from '../types';

export const HUE_LOCATIONS: LocationItem[] = [
  // --- CRAFT VILLAGES (Làng nghề nghệ nhân) ---
  {
    id: 'thanh-tien-paper-flower',
    name: 'Làng Hoa Giấy Thanh Tiên',
    tagline: 'Sắc hoa giấy hơn 300 năm lưu giữ linh hồn Tết Cố Đô',
    category: 'craft',
    kietAddress: 'Xã Phú Mậu, TP. Huế (gần ngã ba Sình)',
    district: 'Phú Mậu',
    coordinates: { lat: 16.5028, lng: 107.6083 },
    estPrice: 20000,
    priceRange: '20.000đ - 50.000đ (Trải nghiệm làm hoa)',
    vibeTags: ['Thơ mộng xứ Huế', 'Hoài niệm vintage', 'Nghệ thuật dân gian'],
    recommendedOutfitColors: ['Trắng tinh khôi', 'Hồng cánh sen', 'Tím Huế', 'Vàng hoàng tộc'],
    outfitTip: 'Mặc áo dài trắng hoặc trang phục pastel nhẹ nhàng để nổi bật giữa giàn hoa giấy rực rỡ sắc màu.',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    highlights: ['Trải nghiệm vuốt cánh sen giấy cùng nghệ nhân', 'Mua cành hoa giấy lưu niệm chỉ từ 10k', 'Không gian sân gạch cổ kính'],
    story: 'Làng Thanh Tiên nằm ven hạ lưu sông Hương, khởi phát từ thời các chúa Nguyễn. Vào tháng Chạp, cả làng như bừng sáng bởi những chông hoa giấy sen ngũ sắc dâng cúng trang thờ tổ tiên.',
    audioStory: {
      title: 'Hơi thở hoa sen giấy bên bờ sông Hương',
      narratorName: 'Nghệ nhân Thân Văn Huy (Đời thứ 3)',
      duration: '1:45',
      ambientSound: 'craft_hammer',
      transcript: 'Chào các bạn trẻ! Tui là Thân Văn Huy, người giữ lửa hoa sen giấy Thanh Tiên. Mỗi cành hoa sen này không chỉ là giấy nhuộm phẩm từ lá cây, mà là cả chữ "Tâm" người Huế dâng kính tổ tiên. Cầm chiếc dùi sắt gõ lách cách, vuốt từng cánh hoa mỏng manh, bạn sẽ thấy tâm mình an lại giữa phố thị xô bồ...'
    },
    artisanInfo: {
      name: 'Nghệ nhân Thân Văn Huy',
      generation: 'Gia tộc 3 đời phục chế hoa sen giấy cung đình',
      craftName: 'Nghệ nhân Ưu tú Hoa sen giấy Thanh Tiên',
      quote: 'Hoa giấy Thanh Tiên không tàn theo thời gian, như chính tâm hồn mộc mạc của đất thần kinh xứ Huế.'
    },
    menuOrTickets: [
      { item: 'Workshop tự tay làm 1 cành hoa sen giấy', price: 20000, description: 'Được nghệ nhân chỉ dẫn từng bước và mang thành phẩm về' },
      { item: 'Cành hoa sen giấy ngũ sắc lưu niệm', price: 25000, description: 'Nhuộm phẩm tự nhiên bền màu' },
      { item: 'Trà sen Huế mời khách', price: 0, description: 'Miễn phí khi ghé thăm gian nhà rường' }
    ],
    genZReview: 'Review thật: Siêu thích chú Huy vì chú chỉ dạy siêu tỉ mỉ, góc sân chụp ảnh lên màu film vintage đỉnh chóp, tốn đúng 20k tiền workshop mà có hoa đem về khoe bạn bè!'
  },
  {
    id: 'tranh-lang-sinh',
    name: 'Làng Tranh Dân Gian Sình',
    tagline: 'Nét khắc gỗ mộc bản độc bản lưu giữ tín ngưỡng đất Cố Đô',
    category: 'craft',
    kietAddress: 'Làng Lại Ân (làng Sình), Xã Phú Mậu, TP. Huế',
    district: 'Phú Mậu',
    coordinates: { lat: 16.5055, lng: 107.6041 },
    estPrice: 15000,
    priceRange: '15.000đ - 30.000đ',
    vibeTags: ['Cổ kính rêu phong', 'Nghệ thuật dân gian', 'Hoài niệm vintage'],
    recommendedOutfitColors: ['Nâu mộc/vintage', 'Trắng tinh khôi', 'Xanh lục bảo'],
    outfitTip: 'Phong cách retro, áo vải đũi hoặc sơ mi vintage màu be đất sẽ cực kỳ hài hòa với sắc mộc bản đen tuyền và giấy điệp óng ánh.',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    highlights: ['Trải nghiệm in tranh mộc bản bằng mực khói tàu', 'Tìm hiểu tranh cúng con giáp', 'Thưởng ngoạn bến đò Sình xưa'],
    story: 'Tranh làng Sình là dòng tranh mộc bản phục vụ đời sống tâm linh của người Huế xưa, vẽ trên giấy điệp quét vỏ sò điệp nghiền mịn lấp lánh như ánh trăng.',
    audioStory: {
      title: 'Tiếng cọ quét mực điệp trên thềm nhà cổ',
      narratorName: 'Nghệ nhân Kỳ Hữu Phước',
      duration: '1:30',
      ambientSound: 'river_boat',
      transcript: 'Bước vào kiệt làng Sình, du khách sẽ ngửi thấy mùi vỏ điệp biển và mực tàu thơm nồng. Tôi cầm bản khắc gỗ này từ năm 14 tuổi, nét chạm dù mộc nhưng đong đầy phù sa sông Hương...'
    },
    artisanInfo: {
      name: 'Nghệ nhân Kỳ Hữu Phước',
      generation: 'Hơn 60 năm gắn bó với mộc bản làng Sình',
      craftName: 'Nghệ nhân Tranh Dân Gian Sình',
      quote: 'Giữ lại từng bản khắc gỗ là giữ lại một góc tâm linh hiền hậu của cha ông ta.'
    },
    menuOrTickets: [
      { item: 'Trải nghiệm tự in tranh mộc bản lên giấy điệp', price: 15000, description: 'Bao gồm giấy điệp và khuôn in khắc gỗ' },
      { item: 'Bức tranh 12 con giáp khổ kỷ niệm', price: 30000, description: 'Đã hoàn thiện đóng dấu mộc đỏ' }
    ],
    genZReview: 'Điểm đến chill dã man, không ồn ào du lịch hóa. Cầm tranh tự in check-in bờ sông đón hoàng hôn đẹp như một bức tranh thuỷ mặc.'
  },
  {
    id: 'duc-dong-phuong-duc',
    name: 'Làng Đúc Đồng Phường Đúc',
    tagline: 'Âm vang Đại Hồng Chung và ngọn lửa lò đúc đồng ngàn năm',
    category: 'craft',
    kietAddress: 'Kiệt đường Bùi Thị Xuân, Phường Đúc, TP. Huế',
    district: 'Phường Đúc',
    coordinates: { lat: 16.4520, lng: 107.5650 },
    estPrice: 0,
    priceRange: 'Miễn phí tham quan',
    vibeTags: ['Cổ kính rêu phong', 'Huyền bí cung đình'],
    recommendedOutfitColors: ['Nâu mộc/vintage', 'Đen cá tính', 'Xanh denim'],
    outfitTip: 'Outfit streetwear hoặc tone màu tối giản giúp nổi bật vẻ đẹp đồng thau ánh kim và lò than rực đỏ.',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    highlights: ['Chiêm ngưỡng thợ đúc đồng rèn khuôn đất sét', 'Nghe tiếng thử chuông ngân vang cả khúc sông', 'Tìm hiểu lịch sử đúc Cửu Đỉnh'],
    story: 'Làng nghề đúc đồng ở Huế hình thành từ đầu thế kỷ 17, nơi sản sinh ra những kiệt tác quốc bảo như Cửu Đỉnh, Cửu Vị Thần Công và Đại Hồng Chung chùa Thiên Mụ.',
    audioStory: {
      title: 'Âm vang đồng thau bên dòng Hương Giang',
      narratorName: 'Nghệ nhân Nguyễn Văn Sính',
      duration: '1:50',
      ambientSound: 'craft_hammer',
      transcript: 'Keng... keng... Bạn đang nghe âm thanh của hợp kim đồng thau pha vàng non. Để một tiếng chuông ngân xa hàng dặm trên sông Hương, tỉ lệ lửa và độ dày khuôn phải chuẩn từng li...'
    },
    artisanInfo: {
      name: 'Nghệ nhân Nguyễn Văn Sính',
      generation: 'Truyền nhân đúc đồng triều Nguyễn',
      craftName: 'Nghệ nhân Làng Đúc Phường Đúc',
      quote: 'Đồng không chỉ có âm thanh, chuông đồng Huế mang cả hồn cốt và lời nguyện cầu an bình.'
    },
    menuOrTickets: [
      { item: 'Vé tham quan xưởng đúc đồng', price: 0, description: 'Nghệ nhân mở cửa đón tiếp miễn phí' },
      { item: 'Chuông gió đồng mini trừ tà', price: 45000, description: 'Được gõ thử âm thanh trước khi mua' }
    ],
    genZReview: 'Được đứng tận mắt xem các bác nghệ nhân đổ khuôn đồng nóng rực cảm giác như xem phim lịch sử sống động, cực kỳ tự hào về tay nghề người Việt!'
  },
  {
    id: 'non-la-phu-cam',
    name: 'Làng Nón Lá Phú Cam & Tây Hồ',
    tagline: 'Bí ẩn nón bài thơ soi bóng sông An Cựu',
    category: 'craft',
    kietAddress: 'Kiệt 109 Phan Đình Phùng, Phường Phước Vĩnh, TP. Huế',
    district: 'Phước Vĩnh',
    coordinates: { lat: 16.4552, lng: 107.5873 },
    estPrice: 25000,
    priceRange: '25.000đ - 60.000đ',
    vibeTags: ['Thơ mộng xứ Huế', 'Cổ kính rêu phong'],
    recommendedOutfitColors: ['Tím Huế', 'Trắng tinh khôi', 'Hồng phấn'],
    outfitTip: 'Tuyệt đối nên chuẩn bị áo dài tím hoặc áo bà ba trắng - cầm chiếc nón bài thơ che nghiêng là có ngay bộ ảnh Huế mộng mơ.',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    highlights: ['Soi nón dưới ánh nắng để thấy bài thơ và cầu Tràng Tiền ẩn hiện', 'Học cách chằm nón bằng chỉ cước trong suốt', 'Ngắm dòng An Cựu êm đềm'],
    story: 'Nón bài thơ xứ Huế là một phát minh tài hoa của người nghệ nhân Tây Hồ: kẹp giữa hai lớp lá nón mỏng tang là những câu thơ lục bát và hình ảnh chùa Thiên Mụ chỉ hiện rõ khi soi lên trời nắng.',
    audioStory: {
      title: 'Câu thơ giấu dưới vành nón nghiêng',
      narratorName: 'O Thuận - Thợ chằm nón 40 năm',
      duration: '1:40',
      ambientSound: 'alley_street',
      transcript: 'Ai ra xứ Huế mộng mơ, mua về chiếc nón bài thơ làm quà... Mời cháu ngồi xuống đây, coi o vuốt từng lá cọ trắng tinh rứa nè. Mũi kim chằm nón phải thật nhuyễn, không được để lộ vết chỉ...'
    },
    artisanInfo: {
      name: 'O Thuận',
      generation: 'Gia đình 4 đời giữ nghề nón lá Phú Cam',
      craftName: 'Nghệ nhân Chằm Nón Bài Thơ',
      quote: 'Chiếc nón che nắng che mưa, nhưng cái nết dịu dàng của người con gái Huế là nằm ở nụ cười lấp ló sau vành nón.'
    },
    menuOrTickets: [
      { item: 'Trải nghiệm xỏ kim chằm vành nón lá', price: 15000, description: 'Được tự tay thêu tên mình lên vành nón' },
      { item: 'Nón lá bài thơ chuẩn lá cọ Tây Hồ', price: 50000, description: 'Soi nắng thấy cảnh chùa Thiên Mụ và câu thơ Huế' }
    ],
    genZReview: 'Mua được chiếc nón xịn giá 50k mà đội đi Đại Nội chụp hình ai cũng khen. Các o trong kiệt thân thiện, hay cho ăn kẹo mè xửng nữa!'
  },
  {
    id: 'dan-lat-bao-la',
    name: 'Làng Nghề Đan Lát Bao La',
    tagline: 'Vẻ đẹp mộc mạc của mây tre đan trăm tuổi bên bờ sông Bồ',
    category: 'craft',
    kietAddress: 'Xã Quảng Phú, Huyện Quảng Điền (ngoại ô Huế)',
    district: 'Quảng Điền',
    coordinates: { lat: 16.5510, lng: 107.5120 },
    estPrice: 20000,
    priceRange: '20.000đ - 60.000đ',
    vibeTags: ['Sinh thái bình yên', 'Hoài niệm vintage', 'Thơ mộng xứ Huế'],
    recommendedOutfitColors: ['Nâu mộc/vintage', 'Xanh mint', 'Trắng tinh khôi'],
    outfitTip: 'Tone màu Earth tone hoặc bohemian, túi cói, nón nan tre mộc mạc.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    highlights: ['Ngắm hàng ngàn mẹt, giỏ, rổ nan tre đan tay tinh xảo', 'Check-in góc xưởng tre mộc mạc', 'Mua đồ trang trí decor phòng Gen Z'],
    story: 'Làng Bao La nổi danh khắp xứ Đàng Trong từ hơn 600 năm trước với câu ca: "Thúng mủng Bao La, đem ra khắp xứ". Từng nan tre được chẻ mỏng dẻo dai, vót chuốt kỳ công.',
    audioStory: {
      title: 'Tiếng rào rào của nan tre sông Bồ',
      narratorName: 'Bác Võ Văn Dinh',
      duration: '1:35',
      ambientSound: 'craft_hammer',
      transcript: 'Tre già măng mọc, cây tre gắn với đời nông dân bao đời nay. Ở Bao La, chúng tôi biến nan tre thành túi xách thời trang, đèn lồng quán cà phê cho các bạn trẻ...'
    },
    menuOrTickets: [
      { item: 'Túi cói nan tre decor vintage', price: 45000, description: 'Rất bền và thân thiện môi trường' },
      { item: 'Chiếc đèn lồng nan tre mini', price: 35000, description: 'Treo góc học tập cực chill' }
    ],
    genZReview: 'Đồ mây tre ở đây rẻ bất ngờ so với shop decor trên phố, decor góc học tập phong cách Wabi-sabi siêu đỉnh!'
  },

  // --- HIDDEN HERITAGE (Di sản kiệt hẻm & Thiên nhiên bí ẩn) ---
  {
    id: 'chua-tu-hieu',
    name: 'Chùa Từ Hiếu & Nghĩa Trang Thái Giám',
    tagline: 'Chốn thiền tịnh rêu phong ẩn mình giữa đồi thông tĩnh lặng',
    category: 'heritage',
    kietAddress: 'Thôn Dương Xuân Thượng III, Phường Thủy Xuân, TP. Huế',
    district: 'Thủy Xuân',
    coordinates: { lat: 16.4358, lng: 107.5689 },
    estPrice: 0,
    priceRange: 'Miễn phí (Tự nguyện công đức)',
    vibeTags: ['Lắng đọng thiền tịnh', 'Cổ kính rêu phong', 'Thơ mộng xứ Huế'],
    recommendedOutfitColors: ['Nâu mộc/vintage', 'Trắng tinh khôi', 'Xanh lam nhạt'],
    outfitTip: 'Trang phục trang nhã, kín đáo (áo lam, sơ mi dài tay, quần tây/váy dài qua gối), tôn trọng sự thanh tịnh chốn thiền môn.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    highlights: ['Hồ bán nguyệt nuôi cá chép bơi lội', 'Khu nghĩa trang độc nhất vô nhị của các Thái giám triều Nguyễn', 'Lắng nghe tiếng chuông chùa giữa rừng thông reo'],
    story: 'Ngôi cổ tự gắn liền với tấm lòng hiếu thảo của Thiền sư Nhất Định nuôi mẹ già, và là nơi an nghỉ của hơn 25 vị Thái giám triều Nguyễn đã góp tiền xây dựng chùa để tìm chốn nương tựa lúc xế chiều.',
    audioStory: {
      title: 'Tiếng chuông sớm và tiếng cá đớp mồi hồ bán nguyệt',
      narratorName: 'Thầy Thích Tuệ Chân',
      duration: '1:50',
      ambientSound: 'temple_bell',
      transcript: 'Chuông ngân... boong... Giữa rừng thông Thủy Xuân, bước chân bạn chậm lại trên con đường lát đá phủ rêu xanh. Hãy dừng chân bên hồ Bán Nguyệt, thả một nắm thức ăn cho đàn cá chép và thở sâu...'
    },
    menuOrTickets: [
      { item: 'Vé tham quan', price: 0, description: 'Chùa mở cửa tự do đón du khách chiêm bái' },
      { item: 'Gói thức ăn cho cá chép hồ Bán Nguyệt', price: 5000, description: 'Mua tại quầy trước cổng tam quan' }
    ],
    genZReview: 'Chùa yên bình đến mức nghe rõ tiếng lá thông rơi. Đi thiền hành quanh hồ cá cảm thấy mọi áp lực thi cử, deadline tan biến hết!'
  },
  {
    id: 'nha-tho-phu-cam',
    name: 'Nhà Thờ Chính Tòa Phủ Cam',
    tagline: 'Kiến trúc hiện đại giao hòa Gothic của kiến trúc sư Ngô Viết Thụ',
    category: 'heritage',
    kietAddress: 'Đỉnh đồi Phước Quả, Kiệt Đoàn Thị Điểm, Phường Phước Vĩnh, TP. Huế',
    district: 'Phước Vĩnh',
    coordinates: { lat: 16.4566, lng: 107.5851 },
    estPrice: 0,
    priceRange: 'Miễn phí',
    vibeTags: ['Cổ kính rêu phong', 'Hoài niệm vintage'],
    recommendedOutfitColors: ['Trắng tinh khôi', 'Đen cá tính', 'Xanh navy'],
    outfitTip: 'Màu trắng hoặc đen đơn sắc tạo hiệu ứng tương phản mạnh mẽ với mảng tường bê tông uốn cong hình búp măng vươn thẳng lên trời.',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    highlights: ['Tác phẩm của KTS Ngô Viết Thụ (tác giả Dinh Độc Lập)', 'Cung thánh hình lòng thuyền vĩ đại', 'View nhìn bao quát thành phố Huế từ trên cao'],
    story: 'Khởi công xây dựng lại từ năm 1963, Nhà thờ Phủ Cam mang ngôn ngữ kiến trúc hiện đại táo bạo với hai trụ bê tông cốt thép chịu lực uốn cong thanh thoát, tượng trưng cho hai bàn tay chắp lại cầu nguyện.',
    audioStory: {
      title: 'Đường cong bê tông và bản giao hưởng ánh sáng',
      narratorName: 'Cố vấn Di sản Kiến trúc Huế',
      duration: '1:35',
      ambientSound: 'royal_court',
      transcript: 'Đứng dưới chân đồi Phước Quả, nhìn lên nhà thờ Phủ Cam, bạn sẽ thấy bàn tay tài hoa của KTS Ngô Viết Thụ. Không rập khuôn Gothic châu Âu, ông đã thổi vào đây nét uyển chuyển của rồng bay phượng múa...'
    },
    menuOrTickets: [
      { item: 'Tham quan khuôn viên và chụp ảnh kiến trúc', price: 0, description: 'Miễn phí, giữ trật tự giờ lễ' }
    ],
    genZReview: 'Góc chụp từ bậc thang kiệt dốc nhìn lên nhà thờ trông như ở châu Âu. Buổi chiều 5h nắng xiên qua kính màu bên trong thánh đường ảo diệu vô cùng!'
  },
  {
    id: 'rung-ngap-man-ru-cha',
    name: 'Rừng Ngập Mặn Rú Chá',
    tagline: 'Bí mật khu rừng nguyên sinh cổ thụ trên đầm phá Tam Giang',
    category: 'heritage',
    kietAddress: 'Làng Thuận Hòa, Xã Hương Phong, TP. Huế',
    district: 'Hương Phong',
    coordinates: { lat: 16.5583, lng: 107.6186 },
    estPrice: 0,
    priceRange: 'Miễn phí (Thuê thuyền 50k/chuyến nếu muốn)',
    vibeTags: ['Sinh thái bình yên', 'Thơ mộng xứ Huế', 'Huyền bí cung đình'],
    recommendedOutfitColors: ['Trắng tinh khôi', 'Vàng hoàng tộc', 'Cam đất'],
    outfitTip: 'Váy trắng bay bổng hoặc tone vàng mustard chụp giữa vòm cây Chá đan chéo rợp bóng tạo cảm giác như lạc vào truyện cổ tích.',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Con đường rêu phong rợp bóng rễ cây Chá uốn lượn', 'Tháp quan sát ngắm toàn cảnh đầm phá Tam Giang', 'Ghé thăm cặp vợ chồng giữ rừng cô độc hơn 30 năm'],
    story: 'Rú Chá là khu rừng ngập mặn nguyên sinh duy nhất còn sót lại trên hệ đầm phá Tam Giang - Cầu Hai. Tên gọi "Rú Chá" ghép từ "Rú" (rừng núi) và "Chá" (loài cây ngập mặn đặc trưng bám rễ chằng chịt).',
    audioStory: {
      title: 'Tiếng gió đầm phá qua vòm lá Chá',
      narratorName: 'Bác Đáp - Người giữ rừng Rú Chá',
      duration: '1:45',
      ambientSound: 'river_boat',
      transcript: 'Chào mấy đứa nhỏ! Tui với bà xã ở cái rú này từ hồi chưa có điện có đường. Cây chá này lạ lắm, rễ nó cắm sâu xuống bùn giữ đất cho Huế mình, mùa thu lá chuyển sang vàng rực cả góc trời...'
    },
    menuOrTickets: [
      { item: 'Tham quan & leo tháp canh', price: 0, description: 'Tự do tham quan' },
      { item: 'Thuê thuyền nan ngắm chim di cư', price: 50000, description: 'Thuyền chèo tay chở 2-3 người lướt nhẹ trên lạch nước' }
    ],
    genZReview: 'Điểm check-in hot nhất mùa thu đông! Không khí mát rượi, lên tháp nhìn 360 độ mênh mông sông nước Tam Giang đã mắt cực kỳ.'
  },
  {
    id: 'cau-ngoi-thanh-toan',
    name: 'Cầu Ngói Thanh Toàn & Chợ Quê Thủy Thanh',
    tagline: 'Cây cầu gỗ cổ "Thượng gia hạ kiều" và điệu hò giã gạo chân chất',
    category: 'heritage',
    kietAddress: 'Làng Thanh Thủy Chánh, Xã Thủy Thanh, Thị xã Hương Thủy (giáp ranh TP. Huế)',
    district: 'Thủy Thanh',
    coordinates: { lat: 16.4468, lng: 107.6322 },
    estPrice: 0,
    priceRange: 'Miễn phí (Ăn vặt chợ quê 10k - 20k)',
    vibeTags: ['Hoài niệm vintage', 'Thơ mộng xứ Huế', 'Cổ kính rêu phong'],
    recommendedOutfitColors: ['Nâu mộc/vintage', 'Trắng tinh khôi', 'Xanh ngọc'],
    outfitTip: 'Áo bà ba mộc mạc hoặc đầm suông vải lanh vintage rất hợp với không gian bến sông bờ tre làng quê.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    highlights: ['Cầu ngói cổ hơn 250 năm do bà Trần Thị Đạo phát tâm xây dựng', 'Thưởng thức bánh canh, bắp hầm, chè đậu ngự ngay bến chợ quê', 'Nhà trưng bày nông cụ cổ truyền'],
    story: 'Cùng với chùa Cầu ở Hội An, Cầu ngói Thanh Toàn là một trong số rất ít cây cầu ngói cổ hiếm hoi còn lưu giữ kết cấu "Thượng gia hạ kiều" (trên là nhà ngói che nắng mưa, dưới là mố cầu bắc qua sông Như Ý).',
    audioStory: {
      title: 'Điệu hò giã gạo bên mố cầu ngói Thanh Toàn',
      narratorName: 'Mệ Làng Thủy Thanh',
      duration: '1:35',
      ambientSound: 'river_boat',
      transcript: 'Ai về cầu ngói Thanh Toàn, cho em về với một đoàn cho vui... Chiếc cầu này mát lắm con ơi, trưa hè bà con đi đồng về ngả lưng trên sập gỗ nghe gió sông Như Ý thổi mát rười rượi...'
    },
    menuOrTickets: [
      { item: 'Ngồi hóng mát trên sập gỗ cầu ngói', price: 0, description: 'Tự do trải nghiệm nghỉ chân' },
      { item: 'Tô bánh canh cá lóc chợ quê', price: 15000, description: 'Nước dùng ngọt lịm từ cá lóc đồng' }
    ],
    genZReview: 'Đi sáng sớm tầm 6h30 ăn tô bánh canh cá lóc nóng hổi 15k xong ra cầu ngắm mấy bác chèo đò thảnh thơi thực sự chữa lành!'
  },
  {
    id: 'kiet-pho-co-bao-vinh',
    name: 'Kiệt Phố Cổ Bao Vinh',
    tagline: 'Dấu tích thương cảng sầm uất xưa nép mình bên triền sông Hương',
    category: 'heritage',
    kietAddress: 'Đường Bao Vinh, Xã Hương Vinh, TP. Huế',
    district: 'Hương Vinh',
    coordinates: { lat: 16.4880, lng: 107.5750 },
    estPrice: 20000,
    priceRange: '20.000đ - 35.000đ (Cafe nhà cổ ven sông)',
    vibeTags: ['Hoài niệm vintage', 'Thơ mộng xứ Huế', 'Nhộn nhịp kiệt hẻm'],
    recommendedOutfitColors: ['Nâu mộc/vintage', 'Cam đất', 'Trắng tinh khôi'],
    outfitTip: 'Phong cách retro thập niên 90, váy hoa nhí hoặc sơ mi cổ cuban check-in bên những bức tường vàng rêu phong.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    highlights: ['Những ngôi nhà rường cổ mái ngói âm dương trên 150 tuổi', 'Quán cà phê Mắt Biếc nổi tiếng trong phim điện ảnh', 'Ngắm hoàng hôn bến đò ngang Bao Vinh'],
    story: 'Bao Vinh từng là phố cảng thương mại phồn hoa bậc nhất Đàng Trong thời chúa Nguyễn, nơi tàu thuyền nước ngoài ghé bốc dỡ gốm sứ và tơ lụa. Ngày nay, nơi đây lưu giữ nét chậm rãi bình dị lạ thường.',
    audioStory: {
      title: 'Ký ức thương cảng Bao Vinh bên bến đò ngang',
      narratorName: 'O Mai - Cư dân nhà cổ Bao Vinh',
      duration: '1:40',
      ambientSound: 'river_boat',
      transcript: 'Phố cổ Bao Vinh không ồn ào như Hội An mô. Ở đây nhà nào cũng có cái hiên nhìn ra sông Hương, chiều chiều ngắm đò ngang qua lại, ăn chén tàu hũ gừng ấm bụng rứa là trọn vẹn một ngày...'
    },
    menuOrTickets: [
      { item: 'Cafe muối ngắm sông Hương tại nhà cổ', price: 22000, description: 'Vị béo mặn đượm đà' },
      { item: 'Chén tàu hũ nóng chan nước đường gừng', price: 10000, description: 'Gánh hàng rong đầu kiệt' }
    ],
    genZReview: 'Điểm check-in quen thuộc từ phim Mắt Biếc nhưng ra ngoài đời còn thơ mộng hơn nhiều, chi phí ăn uống rẻ rề 30k là no nê cả buổi chiều.'
  },

  // --- KIET HEM FOOD SPOTS (Quán ăn đặc sản Kiệt hẻm - Giá niêm yết minh bạch) ---
  {
    id: 'banh-canh-nam-pho-o-thu',
    name: 'Bánh Canh Nam Phổ O Thu (Kiệt Phạm Hồng Thái)',
    tagline: 'Món quà chiều cung đình trứ danh trong lòng kiệt hẻm sâu',
    category: 'food',
    kietAddress: 'Kiệt 374 Phạm Hồng Thái, Phường Vĩnh Ninh, TP. Huế',
    district: 'Vĩnh Ninh',
    coordinates: { lat: 16.4632, lng: 107.5910 },
    estPrice: 20000,
    priceRange: '15.000đ - 20.000đ/tô (Giá niêm yết)',
    vibeTags: ['Nhộn nhịp kiệt hẻm', 'Hoài niệm vintage'],
    recommendedOutfitColors: ['Tím Huế', 'Cam đất', 'Trắng tinh khôi'],
    outfitTip: 'Trang phục thoải mái để dễ dàng ngồi ghế nhựa con trong kiệt hẻm ấm cúng.',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    highlights: ['Nồi bánh canh sánh đỏ màu gạch tôm tươi roi rói', 'Sợi bánh làm từ bột gạo dẻo mịn', 'Nước mắm ruốc ớt chỉ thiên cay nồng đúng gu Huế'],
    story: 'Làng Nam Phổ nổi tiếng với món bánh canh gia truyền được các o gánh rong đi bán dạo từ thời xưa. Bát bánh canh dẻo quánh, phủ lớp nhân tôm thịt giã nhuyễn xào hạt điều đỏ au kích thích vị giác.',
    audioStory: {
      title: 'Tiếng rao bánh canh Nam Phổ trong chiều mưa xứ Huế',
      narratorName: 'O Thu - Chủ quán',
      duration: '1:30',
      ambientSound: 'alley_street',
      transcript: 'Ai bánh canh Nam Phổ hông... Mấy cháu ngồi vô đây, kiệt ni khuất gió ấm lắm. Nồi bánh canh ni o quấy từ 2 giờ chiều, bột phải quấy đều tay không khê, tôm đầm Chuồn ngọt tự nhiên chứ không nêm bột ngọt mô nghen!'
    },
    menuOrTickets: [
      { item: 'Tô bánh canh Nam Phổ tôm cua đặc biệt', price: 20000, description: 'Đầy ắp nhân tôm thịt cua ngọt thanh' },
      { item: 'Tô bánh canh Nam Phổ thường', price: 15000, description: 'Vừa vặn cho bữa xế chiều' },
      { item: 'Chả cua viên thêm', price: 5000, description: 'Giòn dai thơm nức mũi' }
    ],
    genZReview: 'Đúng chuẩn bánh canh Nam Phổ truyền thống, nước sền sệt thơm lừng, 20k/tô no căng bụng. Tuyệt đối không lo bị chém giá vì có bảng niêm yết rõ ràng!'
  },
  {
    id: 'banh-xeo-ca-kinh-lang-chuon',
    name: 'Bánh Xèo Cá Kình Chợ Làng Chuồn (Đầm Chuồn)',
    tagline: 'Vị ngọt béo của cá kình đầm phá giòn rụm trên chảo gang nhỏ',
    category: 'food',
    kietAddress: 'Chợ Làng Chuồn, Xã Phú An, Huyện Phú Vang (cách trung tâm 9km)',
    district: 'Phú An',
    coordinates: { lat: 16.4950, lng: 107.6710 },
    estPrice: 30000,
    priceRange: '25.000đ - 35.000đ/cặp',
    vibeTags: ['Sinh thái bình yên', 'Nhộn nhịp kiệt hẻm'],
    recommendedOutfitColors: ['Vàng hoàng tộc', 'Xanh mint', 'Trắng tinh khôi'],
    outfitTip: 'Phong cách dã ngoại năng động, giày thể thao để tiện đi bộ khám phá chợ nổi và đầm phá.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    highlights: ['Tự tay chọn cá kình tươi sống vừa đánh lưới từ đầm lên', 'Chiên trên bếp than củi vàng giòn', 'Chấm nước mắm ớt nguyên chất ăn kèm rau sống'],
    story: 'Đến đầm Chuồn sáng sớm, du khách ghé chợ mua cá kình tươi mang lại các o chiên bánh xèo. Ruột cá kình có vị đắng nhẹ bổ dưỡng, hòa cùng thịt cá béo ngọt và vỏ bánh giòn rụm.',
    audioStory: {
      title: 'Tiếng xèo xèo bên chảo than rực lửa chợ Làng Chuồn',
      narratorName: 'Mệ Năm Bánh Xèo',
      duration: '1:40',
      ambientSound: 'alley_street',
      transcript: 'Xèo... tiếng mỡ sôi thơm phức! Con cá kình ni sáng nay chú lái đò mới bắt ở đầm lên đó con. Ruột nó hơi nhân nhẫn đắng mà ăn quen là ghiền, ngủ ngon giấc lắm rứa...'
    },
    menuOrTickets: [
      { item: 'Bánh xèo cá kình nguyên con', price: 25000, description: 'Chiên giòn 2 mặt cùng hành lá giá đỗ' },
      { item: 'Bánh xèo mực cơm đầm phá', price: 30000, description: 'Mực tươi giòn sần sật' },
      { item: 'Trà đá lá vằng hạ nhiệt', price: 3000, description: 'Mát lành' }
    ],
    genZReview: 'Trải nghiệm đỉnh nhất khi đến Huế! Tự ra sạp mua cá tươi xong nhờ o đúc bánh xèo, ăn nóng hổi giữa chợ quê rẻ mà ngon chấn động.'
  },
  {
    id: 'che-hem-mu-kiet',
    name: 'Chè Hẻm Mụ Kiệt (Kiệt 1 Hùng Vương)',
    tagline: 'Vương quốc 20 món chè Cố Đô độc lạ với chè bột lọc bọc heo quay',
    category: 'food',
    kietAddress: 'Kiệt 1 Hùng Vương, Phường Phú Hội, TP. Huế',
    district: 'Phú Hội',
    coordinates: { lat: 16.4678, lng: 107.5960 },
    estPrice: 15000,
    priceRange: '12.000đ - 18.000đ/ly (Menu cố định)',
    vibeTags: ['Nhộn nhịp kiệt hẻm', 'Hoài niệm vintage'],
    recommendedOutfitColors: ['Hồng pastel', 'Trắng tinh khôi', 'Tím Huế'],
    outfitTip: 'Trang phục dạo phố năng động, cầm ly chè check-in đầu hẻm rêu phong.',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    highlights: ['Món chè bột lọc bọc thịt heo quay mặn ngọt lạ miệng', 'Chè hạt sen bọc nhãn lồng thanh tao', 'Không gian quán hẻm hơn 35 năm tuổi'],
    story: 'Nằm sâu trong con hẻm nhỏ trên đường Hùng Vương, quán chè mụ Kiệt gắn liền với ký ức tuổi học trò của biết bao thế hệ người Huế. Nồi chè nào cũng ninh kỹ, ngọt thanh tao không gắt.',
    audioStory: {
      title: 'Tiếng múc chè lanh canh trong con hẻm cổ',
      narratorName: 'Mệ Kiệt - Chủ quán chè Hẻm',
      duration: '1:35',
      ambientSound: 'alley_street',
      transcript: 'Mấy đứa vô trong hẻm ngồi cho mát! Ăn chè bột lọc bọc heo quay thì phải cắn ngập viên bột, vừa có vị dai giòn, vị ngọt của đường phèn với vị béo mặn của thịt quay mộc nhĩ nghen...'
    },
    menuOrTickets: [
      { item: 'Chè bột lọc bọc heo quay trứ danh', price: 15000, description: 'Viên bột trong vắt, nước gừng ấm' },
      { item: 'Chè hạt sen hồ Tịnh Tâm', price: 18000, description: 'Hạt sen bở tơi, bùi ngậy' },
      { item: 'Chè thập cẩm Cố Đô mát lạnh', price: 12000, description: 'Mix 5 loại đậu nước cốt dừa béo ngậy' }
    ],
    genZReview: '15k một ly chè heo quay ăn lạ miệng nhưng dính cực kỳ! Quán hẻm đông nghẹt sinh viên nhưng phục vụ nhanh như chớp.'
  },
  {
    id: 'banh-ep-cay-dua',
    name: 'Bánh Ép Cây Dừa (Kiệt 116 Bà Triệu)',
    tagline: 'Món ăn vặt "quốc dân" của học sinh sinh viên xứ Huế',
    category: 'food',
    kietAddress: 'Kiệt 116 Bà Triệu, Phường Phú Nhuận, TP. Huế',
    district: 'Phú Nhuận',
    coordinates: { lat: 16.4605, lng: 107.5992 },
    estPrice: 20000,
    priceRange: '2.500đ - 30.000đ (Ăn thỏa thích)',
    vibeTags: ['Nhộn nhịp kiệt hẻm'],
    recommendedOutfitColors: ['Vàng hoàng tộc', 'Xanh denim', 'Cam đất'],
    outfitTip: 'Outfit trẻ trung Gen Z, sơ mi phom rộng hoặc áo thun thoải mái.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    highlights: ['Bánh ép trứng thịt nóng hổi ép tại chỗ trên khuôn gang', 'Rau răm chua ngọt và dưa leo ăn kèm chống ngấy', 'Giá siêu rẻ chỉ từ 3k/cái'],
    story: 'Bánh ép là "đặc sản tuổi thơ" của học sinh Huế. Bột lọc pha thịt mỡ băm nhỏ ép chặt giữa hai khuôn gang nung đỏ, đập thêm quả trứng cút rồi cuốn tròn chấm mắm nêm chua ngọt.',
    audioStory: {
      title: 'Xèo... tiếng ép khuôn gang bánh ép kiệt Bà Triệu',
      narratorName: 'O Lan Bánh Ép',
      duration: '1:25',
      ambientSound: 'alley_street',
      transcript: 'Ép một cái... xèo... lật mặt khuôn... xèo tiếp! Bánh ép muốn ngon là phải ăn lúc nóng giòn dẻo, cuốn nhiều dưa chua với rau răm rồi chấm ngập bát mắm ớt tỏi cay xé lưỡi nghen...'
    },
    menuOrTickets: [
      { item: 'Dĩa 5 cái bánh ép trứng pate đặc biệt', price: 20000, description: 'Kèm đầy đủ rau sống, tré và dưa chua' },
      { item: 'Bánh ép thịt thường', price: 3000, description: 'Đậm đà hương vị truyền thống' },
      { item: 'Sữa chua dẻo nhà làm', price: 8000, description: 'Tráng miệng ngọt ngào' }
    ],
    genZReview: 'Cầm 30k vào đây là ăn no cành hông! Nước chấm mắm nêm ở đây pha đỉnh của chóp, cay cay ngọt ngọt đúng vị Huế.'
  },
  {
    id: 'bun-bo-mu-roi',
    name: 'Bún Bò Mụ Rơi (Kiệt Nguyễn Du)',
    tagline: 'Hương vị bún bò gánh kiệt cổ chuẩn vị mắm ruốc xưa',
    category: 'food',
    kietAddress: 'Kiệt 40 Nguyễn Du, Phường Phú Cát, TP. Huế',
    district: 'Phú Cát',
    coordinates: { lat: 16.4715, lng: 107.5925 },
    estPrice: 35000,
    priceRange: '30.000đ - 45.000đ/tô',
    vibeTags: ['Nhộn nhịp kiệt hẻm', 'Cổ kính rêu phong'],
    recommendedOutfitColors: ['Nâu mộc/vintage', 'Trắng tinh khôi', 'Xanh rêu'],
    outfitTip: 'Trang phục thoải mái để tận hưởng tô bún bò bốc khói nghi ngút buổi sáng sớm.',
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    highlights: ['Nước dùng trong vắt nhưng dậy mùi sả tươi và mắm ruốc', 'Chả cua quết tay dai ngọt tự nhiên', 'Thịt bắp hoa bò luộc mềm tan'],
    story: 'Quán bún bò mụ Rơi nằm khiêm nhường trong con ngõ nhỏ gần sông Đông Ba, nấu theo công thức gia truyền không dùng phẩm màu, chỉ lấy vị ngọt thanh từ xương ống bò ninh thâu đêm.',
    audioStory: {
      title: 'Hương sả mắm ruốc ngào ngạt sớm mai Cố Đô',
      narratorName: 'Mụ Rơi - Chủ quán đời thứ hai',
      duration: '1:45',
      ambientSound: 'alley_street',
      transcript: 'Bún bò Huế mình phải ăn sợi nhỏ, nước dùng thơm sả thoang thoảng mùi ruốc mà không nồng. O múc cho cháu tô bắp hoa chả cua thêm chút ớt rim cay xé lưỡi cho ấm bụng nghen...'
    },
    menuOrTickets: [
      { item: 'Tô bún bò thập cẩm (bắp bò, giò gân, chả cua)', price: 40000, description: 'Tô đầy đặn trứ danh' },
      { item: 'Tô bún bò nạm chả nhỏ', price: 30000, description: 'Phù hợp ăn sáng nhẹ nhàng' }
    ],
    genZReview: 'Không bị mùi ruốc gắt như mấy quán mặt tiền làm cho du khách, nước dùng ngọt thanh tao đúng chất Huế cổ, ăn xong không hề bị khát nước!'
  },
  {
    id: 'banh-beo-nam-loc-ba-do',
    name: 'Bánh Bèo - Nậm - Lọc Kiệt Ngự Bình',
    tagline: 'Mâm bánh bèo chén tôm cháy vàng ruộm giòn tan da heo chiên',
    category: 'food',
    kietAddress: 'Kiệt 8 Nguyễn Bỉnh Khiêm, Phường Phú Cát, TP. Huế',
    district: 'Phú Cát',
    coordinates: { lat: 16.4740, lng: 107.5940 },
    estPrice: 35000,
    priceRange: '30.000đ - 50.000đ/khay',
    vibeTags: ['Nhộn nhịp kiệt hẻm', 'Cổ kính rêu phong'],
    recommendedOutfitColors: ['Tím Huế', 'Trắng tinh khôi', 'Vàng hoàng tộc'],
    outfitTip: 'Màu sắc nổi bật bên mâm bánh chén ngũ sắc.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    highlights: ['Khay 10 chén bánh bèo nóng hổi tôm chấy đỏ cam', 'Bánh nậm gói lá dong mỏng mướt', 'Nước mắm ngọt cay xắt ớt xanh cay nồng'],
    story: 'Bánh bèo Huế được đúc trong những chiếc chén sành nhỏ xíu, xoáy tròn ở tâm. Khi ăn chan một muỗng nước mắm ngọt cay lên, cắn miếng tóp mỡ giòn rụm tạo nên bản hòa ca vị giác.',
    audioStory: {
      title: 'Lách cách muỗng tre trên khay bánh bèo chén',
      narratorName: 'O Liên - Người đúc bánh',
      duration: '1:35',
      ambientSound: 'alley_street',
      transcript: 'Bánh bèo Huế mình phải múc bằng cái chèo tre nhỏ con ơi. Chan muỗng nước mắm ớt xanh vô chén, và một miếng là bột gạo nó trôi mềm trong cổ họng...'
    },
    menuOrTickets: [
      { item: 'Khay 10 chén bánh bèo tôm cháy tóp mỡ', price: 30000, description: 'Tôm sông Hương chấy mịn' },
      { item: 'Dĩa 5 cái bánh nậm lá chuối thơm lừng', price: 25000, description: 'Bột gạo dẻo quánh tôm thịt' },
      { item: 'Bánh lọc trần tôm rim đậm đà', price: 30000, description: 'Vỏ dai giòn sần sật' }
    ],
    genZReview: 'Đi nhóm 2 người gọi khay bánh bèo với dĩa bánh nậm chia nhau hết có 30k/người mà no ứ ự. Tóp mỡ giòn tan ăn mê chữ ê kéo dài!'
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-kim-khanh',
    name: 'Thẻ Bài Kim Khánh',
    royalTitle: 'Đệ Nhất Thám Hiểm Hoàng Cung',
    icon: '🏅',
    description: 'Khám phá ít nhất 3 di sản & kiệt hẻm tại Cố Đô Huế.',
    unlocked: true,
    requiredStreak: 1,
    unlockedAt: 'Hôm nay'
  },
  {
    id: 'badge-non-bai-tho',
    name: 'Nón Bài Thơ Xứ Huế',
    royalTitle: 'Sứ Giả Kiệt Hẻm Mộng Mơ',
    icon: '👒',
    description: 'Thưởng thức ẩm thực kiệt hẻm và nghe trọn vẹn 1 câu chuyện audio.',
    unlocked: true,
    requiredStreak: 2,
    unlockedAt: 'Hôm nay'
  },
  {
    id: 'badge-chu-tho',
    name: 'Chữ Thọ Cung Đình',
    royalTitle: 'Bậc Thầy Tiết Kiệm Gen Z',
    icon: '💮',
    description: 'Hoàn thành 1 chuyến đi không vượt quá ngân sách đã định ra.',
    unlocked: false,
    requiredStreak: 3
  },
  {
    id: 'badge-hoa-sen',
    name: 'Bông Sen Thanh Tiên',
    royalTitle: 'Nghệ Nhân Làng Nghề Trẻ',
    icon: '🌸',
    description: 'Ghé thăm và tương tác với ít nhất một làng nghề truyền thống.',
    unlocked: false,
    requiredStreak: 4
  },
  {
    id: 'badge-dai-hong-chung',
    name: 'Đại Hồng Chung',
    royalTitle: 'Đại Sứ Di Sản Cố Đô',
    icon: '🔔',
    description: 'Đạt chuỗi khám phá 5 ngày liên tục và chia sẻ card flex lên MXH.',
    unlocked: false,
    requiredStreak: 5
  }
];

export const HUE_START_POINTS = [
  { name: 'Cầu Tràng Tiền (Trung tâm TP. Huế)', lat: 16.4682, lng: 107.5908 },
  { name: 'Ga Huế (Đường Bùi Thị Xuân)', lat: 16.4589, lng: 107.5794 },
  { name: 'Chợ Đông Ba (Bến xe & Cổng chợ)', lat: 16.4712, lng: 107.5878 },
  { name: 'Khu vực Đại Nội (Cửa Ngọ Môn)', lat: 16.4695, lng: 107.5775 },
  { name: 'Đầm Chuồn (Bến thuyền Phú An)', lat: 16.4950, lng: 107.6710 }
];

export const VIBE_OPTIONS = [
  'Cổ kính rêu phong',
  'Thơ mộng xứ Huế',
  'Nhộn nhịp kiệt hẻm',
  'Lắng đọng thiền tịnh',
  'Hoài niệm vintage',
  'Sinh thái bình yên'
];

export const OUTFIT_COLORS = [
  { name: 'Tím Huế', hex: '#4A2E65', desc: 'Thanh lịch hoàng gia, hợp di sản & cầu ngói' },
  { name: 'Trắng tinh khôi', hex: '#FFFFFF', desc: 'Nổi bật tại làng hoa giấy Thanh Tiên & nhà rường' },
  { name: 'Vàng hoàng tộc', hex: '#C59B27', desc: 'Tone màu ấm Cung An Định, Rú Chá & kiệt rêu' },
  { name: 'Xanh lục bảo', hex: '#005A5B', desc: 'Hài hòa chốn thiền môn chùa cổ & hồ nước' },
  { name: 'Nâu mộc/vintage', hex: '#634832', desc: 'Chuẩn phong cách mộc bản làng Sình & gốm cổ' },
  { name: 'Cam đất / Pastel', hex: '#D97706', desc: 'Năng động dạo kiệt hẻm ẩm thực đêm' }
];
