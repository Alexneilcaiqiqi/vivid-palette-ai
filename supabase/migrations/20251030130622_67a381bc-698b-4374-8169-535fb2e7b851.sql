-- 将 caixiaoye37@gmail.com 升级为管理员
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = '282e97b6-4ecd-40a6-a8ff-237e44c1895c';