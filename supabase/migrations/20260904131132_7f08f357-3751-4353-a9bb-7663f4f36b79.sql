CREATE TABLE public.wishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wish_one TEXT NOT NULL,
  wish_two TEXT NOT NULL,
  wish_three TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.wishes TO anon;
GRANT INSERT ON public.wishes TO authenticated;
GRANT ALL ON public.wishes TO service_role;

ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send wishes"
  ON public.wishes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);