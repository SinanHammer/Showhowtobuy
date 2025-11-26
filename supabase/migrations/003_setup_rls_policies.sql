-- 启用行级安全策略（RLS）
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- 用户表策略
-- 允许匿名用户注册
CREATE POLICY "允许注册新用户" ON users FOR INSERT WITH CHECK (true);
-- 允许用户查看自己的信息
CREATE POLICY "用户查看自己的信息" ON users FOR SELECT USING (auth.uid() = id);
-- 允许用户更新自己的信息
CREATE POLICY "用户更新自己的信息" ON users FOR UPDATE USING (auth.uid() = id);

-- 商品表策略
-- 允许所有人查看商品
CREATE POLICY "允许查看商品" ON products FOR SELECT USING (is_active = true);
-- 允许管理员管理商品（这里简化处理，实际应该检查用户角色）
CREATE POLICY "允许管理商品" ON products FOR ALL USING (auth.uid() IS NOT NULL);

-- 购物车表策略
-- 用户只能管理自己的购物车
CREATE POLICY "用户管理自己的购物车" ON cart_items FOR ALL USING (auth.uid() = user_id);

-- 地址表策略
-- 用户只能管理自己的地址
CREATE POLICY "用户管理自己的地址" ON addresses FOR ALL USING (auth.uid() = user_id);

-- 订单表策略
-- 用户只能查看和管理自己的订单
CREATE POLICY "用户查看自己的订单" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "用户创建订单" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "用户更新自己的订单" ON orders FOR UPDATE USING (auth.uid() = user_id);

-- 订单项表策略
-- 用户只能查看自己的订单项
CREATE POLICY "用户查看自己的订单项" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  )
);

-- 评价表策略
-- 用户只能管理自己的评价
CREATE POLICY "用户管理自己的评价" ON reviews FOR ALL USING (auth.uid() = user_id);
-- 允许查看商品的公开评价
CREATE POLICY "允许查看商品评价" ON reviews FOR SELECT USING (true);

-- 分类表策略
-- 允许所有人查看分类
CREATE POLICY "允许查看分类" ON categories FOR SELECT USING (is_active = true);

-- 轮播图表策略
-- 允许所有人查看轮播图
CREATE POLICY "允许查看轮播图" ON banners FOR SELECT USING (is_active = true AND (start_date IS NULL OR start_date <= NOW()) AND (end_date IS NULL OR end_date >= NOW()));

-- 授予权限
GRANT SELECT ON users TO anon, authenticated;
GRANT INSERT ON users TO anon;
GRANT UPDATE ON users TO authenticated;

GRANT SELECT ON products TO anon, authenticated;
GRANT ALL ON products TO authenticated;

GRANT ALL ON cart_items TO authenticated;

GRANT ALL ON addresses TO authenticated;

GRANT SELECT, INSERT, UPDATE ON orders TO authenticated;

GRANT SELECT ON order_items TO authenticated;

GRANT SELECT, INSERT, UPDATE ON reviews TO authenticated;
GRANT SELECT ON reviews TO anon;

GRANT SELECT ON categories TO anon, authenticated;

GRANT SELECT ON banners TO anon, authenticated;