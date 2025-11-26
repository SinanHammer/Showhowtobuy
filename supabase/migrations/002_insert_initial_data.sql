-- 插入初始分类数据
INSERT INTO categories (name, slug, description, image_url, sort_order) VALUES
('连衣裙', 'dresses', '优雅连衣裙，适合各种场合', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20women%20dress%20minimalist%20style%20white%20background&image_size=square', 1),
('上衣', 'tops', '时尚上衣，百搭单品', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fashionable%20women%20top%20minimalist%20style%20white%20background&image_size=square', 2),
('裤装', 'pants', '舒适裤装，修身显瘦', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20women%20pants%20minimalist%20style%20white%20background&image_size=square', 3),
('外套', 'outerwear', '时尚外套，保暖有型', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=stylish%20women%20outerwear%20minimalist%20style%20white%20background&image_size=square', 4),
('配饰', 'accessories', '精美配饰，点缀造型', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20women%20accessories%20minimalist%20style%20white%20background&image_size=square', 5);

-- 插入初始商品数据
INSERT INTO products (name, description, price, category, images, sizes, colors, stock_quantity, is_active) VALUES
('经典白衬衫', '简约设计的白色衬衫，适合商务和休闲场合', 299.00, '上衣', 
 ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=classic%20white%20shirt%20women%20minimalist%20style%20professional%20look&image_size=square'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['白色'], 50, true),

('黑色连衣裙', '优雅的黑色连衣裙，显瘦修身设计', 599.00, '连衣裙',
 ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20black%20dress%20women%20minimalist%20style%20slim%20fit&image_size=square'],
 ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['黑色'], 30, true),

('牛仔裤', '经典蓝色牛仔裤，舒适弹力面料', 399.00, '裤装',
 ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=classic%20blue%20jeans%20women%20minimalist%20style%20comfortable%20stretch&image_size=square'],
 ARRAY['26', '27', '28', '29', '30', '31', '32'], ARRAY['蓝色'], 40, true),

('米色风衣', '经典米色风衣，春秋必备单品', 899.00, '外套',
 ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=classic%20beige%20trench%20coat%20women%20minimalist%20style%20spring%20autumn&image_size=square'],
 ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['米色'], 20, true),

('丝绸围巾', '高品质丝绸围巾，多种颜色可选', 199.00, '配饰',
 ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=high%20quality%20silk%20scarf%20women%20minimalist%20style%20various%20colors&image_size=square'],
 ARRAY['均码'], ARRAY['粉色', '蓝色', '米色'], 60, true),

('针织毛衣', '温暖舒适的针织毛衣，秋冬必备', 459.00, '上衣',
 ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=warm%20knit%20sweater%20women%20minimalist%20style%20comfortable%20autumn%20winter&image_size=square'],
 ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['米色', '灰色', '粉色'], 35, true),

('职业套装', '专业职业套装，包含西装外套和裙子', 1299.00, '连衣裙',
 ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20suit%20women%20minimalist%20style%20blazer%20skirt&image_size=square'],
 ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['黑色', '深蓝色'], 15, true),

('运动套装', '时尚运动套装，舒适透气面料', 699.00, '上衣',
 ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=stylish%20sportswear%20set%20women%20minimalist%20style%20breathable%20fabric&image_size=square'],
 ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['黑色', '灰色', '粉色'], 25, true);

-- 插入轮播图数据
INSERT INTO banners (title, image_url, link_url, sort_order, is_active, start_date, end_date) VALUES
('春季新品上市', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=spring%20fashion%20collection%20banner%20women%20clothing%20minimalist%20style%20pastel%20colors&image_size=landscape_16_9', '/products?category=new', 1, true, NOW(), NOW() + INTERVAL '30 days'),
('夏季清仓特惠', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=summer%20sale%20banner%20women%20clothing%20minimalist%20style%20discount%20promotion&image_size=landscape_16_9', '/products?category=sale', 2, true, NOW(), NOW() + INTERVAL '15 days'),
('VIP会员专享', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=vip%20member%20exclusive%20banner%20women%20fashion%20premium%20style&image_size=landscape_16_9', '/vip', 3, true, NOW(), NOW() + INTERVAL '60 days');