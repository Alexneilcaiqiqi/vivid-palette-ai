-- 删除可能存在的旧约束（如果有）
ALTER TABLE public.articles DROP CONSTRAINT IF EXISTS articles_author_id_fkey;

-- 添加外键约束，将 author_id 关联到 profiles 表
ALTER TABLE public.articles 
ADD CONSTRAINT articles_author_id_fkey 
FOREIGN KEY (author_id) 
REFERENCES public.profiles(id) 
ON DELETE SET NULL;