-- 将第一个用户设置为管理员
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = '16aad71d-1b3b-479b-90b9-3f7c416a8d85';