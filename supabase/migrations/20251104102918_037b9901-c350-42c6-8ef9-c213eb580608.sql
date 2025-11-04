-- 添加账户订阅到期时间字段到profiles表
ALTER TABLE public.profiles 
ADD COLUMN subscription_expires_at TIMESTAMP WITH TIME ZONE;

-- 创建购买记录表
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  product_name TEXT NOT NULL,
  product_description TEXT,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 启用RLS
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的购买记录
CREATE POLICY "Users can view own purchases"
ON public.purchases
FOR SELECT
USING (auth.uid() = user_id);

-- 管理员可以查看所有购买记录
CREATE POLICY "Admins can view all purchases"
ON public.purchases
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- 创建索引提高查询性能
CREATE INDEX idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX idx_purchases_created_at ON public.purchases(created_at DESC);