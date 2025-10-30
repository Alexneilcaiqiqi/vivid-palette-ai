-- 创建触发器函数：自动为第一个注册的用户分配管理员角色
create or replace function public.handle_new_user_role()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  user_count integer;
begin
  -- 检查是否是第一个用户
  select count(*) into user_count from auth.users;
  
  -- 如果是第一个用户，自动设置为管理员
  if user_count = 1 then
    insert into public.user_roles (user_id, role)
    values (new.id, 'admin');
  else
    -- 其他用户默认为普通用户角色
    insert into public.user_roles (user_id, role)
    values (new.id, 'user');
  end if;
  
  return new;
end;
$$;

-- 创建触发器：在用户注册时自动分配角色
drop trigger if exists on_auth_user_created_role on auth.users;
create trigger on_auth_user_created_role
  after insert on auth.users
  for each row execute procedure public.handle_new_user_role();