-- inserts a row into public."user" 
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$ 
declare
    v_feed_order TEXT := '"[{"folder_name":"News","order":0,"folded":true,"children":[{"feedId":"clyc8a9eq0000hb7wfdpuifvl","order":0},{"feedId":"clyc8moo50001hb7w1f5brelz","order":1},{"feedId":"clyc8nq260002hb7wddvygri8","order":2},{"feedId":"clyf49or30005w2vwhn7up7u7","order":4},{"feedId":"clyf4a0ok0006w2vweefmfps8","order":5},{"feedId":"clyf4a2vi0007w2vwsocz81kt","order":6}]},{"folder_name":"Tech","order":1,"folded":true,"children":[{"feedId":"clyf48yku0000w2vwz6xpbfq8","order":0},{"feedId":"clyf490pn0001w2vwxr07cwn2","order":1}]},{"folder_name":"Digital Assets","order":2,"folded":true,"children":[{"feedId":"clyeygs0x0001gbjqgczretma","order":0}]},{"folder_name":"Forecasting","order":4,"folded":true,"children":[{"feedId":"clyukv95b0000k7gfp6i19zmc","order":0}]},{"folder_name":"Adjacent","order":5,"folded":true,"children":[{"feedId":"clyukvqol0001k7gfjdd3ph8i","order":0}]}]"';
begin
  insert into public."user" (
    id, 
    "name",
    "email",
    "user_id",
    "feed_order",
  ) 
  values (
    new.id,
    new.raw_user_meta_data->>'name', 
    new."email",
    new.id,
    v_feed_order
  );
  return new;
end;
$$;

-- inserts a row into public."user_feeds" 
create function public.handle_new_user_feeds()
returns trigger
language plpgsql
security definer set search_path = public
as $$ 
declare
    v_feed_order TEXT := '"[{"folder_name":"News","order":0,"folded":true,"children":[{"feedId":"clyc8a9eq0000hb7wfdpuifvl","order":0},{"feedId":"clyc8moo50001hb7w1f5brelz","order":1},{"feedId":"clyc8nq260002hb7wddvygri8","order":2},{"feedId":"clyf49or30005w2vwhn7up7u7","order":4},{"feedId":"clyf4a0ok0006w2vweefmfps8","order":5},{"feedId":"clyf4a2vi0007w2vwsocz81kt","order":6}]},{"folder_name":"Tech","order":1,"folded":true,"children":[{"feedId":"clyf48yku0000w2vwz6xpbfq8","order":0},{"feedId":"clyf490pn0001w2vwxr07cwn2","order":1}]},{"folder_name":"Digital Assets","order":2,"folded":true,"children":[{"feedId":"clyeygs0x0001gbjqgczretma","order":0}]},{"folder_name":"Forecasting","order":4,"folded":true,"children":[{"feedId":"clyukv95b0000k7gfp6i19zmc","order":0}]},{"folder_name":"Adjacent","order":5,"folded":true,"children":[{"feedId":"clyukvqol0001k7gfjdd3ph8i","order":0}]}]"';
begin
  INSERT INTO public."user_feeds" (feed_id, user_id)
  VALUES 
    ('clyc8a9eq0000hb7wfdpuifvl', new.id),
    ('clyc8moo50001hb7w1f5brelz', new.id),
    ('clyc8nq260002hb7wddvygri8', new.id),
    ('clyf49or30005w2vwhn7up7u7', new.id),
    ('clyf4a0ok0006w2vweefmfps8', new.id),
    ('clyf4a2vi0007w2vwsocz81kt', new.id),
    ('clyf48yku0000w2vwz6xpbfq8', new.id),
    ('clyf490pn0001w2vwxr07cwn2', new.id),
    ('clyeygs0x0001gbjqgczretma', new.id),
    ('clyukv95b0000k7gfp6i19zmc', new.id),
    ('clyukvqol0001k7gfjdd3ph8i', new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger on_auth_user_feeds_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user_feeds();

-- Security 
-- By default, supabase exposes the public schema but since we route through nextjs/trpc we don't need to do this
-- This also makes it so we don't need row-level security (RLS)
REVOKE USAGE ON SCHEMA public FROM anon, authenticated;

-- View for Prisma 
create or replace view auth_users as
select
  *
from
  auth.users
