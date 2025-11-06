-- 添加手机号字段到profiles表
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone);