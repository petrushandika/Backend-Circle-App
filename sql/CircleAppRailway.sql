PGDMP      :                |         	   circleapp    16.2    16.2 8    -           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            .           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            /           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            0           1262    17062 	   circleapp    DATABASE     �   CREATE DATABASE circleapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE circleapp;
                postgres    false                        2615    17795    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            1           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            2           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    17796    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            �            1259    17840    follow    TABLE     �   CREATE TABLE public.follow (
    id integer NOT NULL,
    "followersId" integer NOT NULL,
    "followingId" integer NOT NULL,
    "followAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.follow;
       public         heap    postgres    false    5            �            1259    17839    follow_id_seq    SEQUENCE     �   CREATE SEQUENCE public.follow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.follow_id_seq;
       public          postgres    false    5    223            3           0    0    follow_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.follow_id_seq OWNED BY public.follow.id;
          public          postgres    false    222            �            1259    17848    like    TABLE       CREATE TABLE public."like" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "threadId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."like";
       public         heap    postgres    false    5            �            1259    17847    like_id_seq    SEQUENCE     �   CREATE SEQUENCE public.like_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.like_id_seq;
       public          postgres    false    225    5            4           0    0    like_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.like_id_seq OWNED BY public."like".id;
          public          postgres    false    224            �            1259    17829    reply    TABLE     H  CREATE TABLE public.reply (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "threadId" integer NOT NULL,
    image text,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.reply;
       public         heap    postgres    false    5            �            1259    17828    reply_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reply_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.reply_id_seq;
       public          postgres    false    221    5            5           0    0    reply_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.reply_id_seq OWNED BY public.reply.id;
          public          postgres    false    220            �            1259    17817    thread    TABLE     �  CREATE TABLE public.thread (
    id integer NOT NULL,
    content text NOT NULL,
    "totalReplies" integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    image text,
    "totalLikes" integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.thread;
       public         heap    postgres    false    5            �            1259    17816    thread_id_seq    SEQUENCE     �   CREATE SEQUENCE public.thread_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.thread_id_seq;
       public          postgres    false    219    5            6           0    0    thread_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.thread_id_seq OWNED BY public.thread.id;
          public          postgres    false    218            �            1259    17806    user    TABLE     l  CREATE TABLE public."user" (
    id integer NOT NULL,
    "fullName" text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    avatar text,
    bio text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    password text NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false    5            �            1259    17805    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    217    5            7           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    216            u           2604    17843 	   follow id    DEFAULT     f   ALTER TABLE ONLY public.follow ALTER COLUMN id SET DEFAULT nextval('public.follow_id_seq'::regclass);
 8   ALTER TABLE public.follow ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            w           2604    17851    like id    DEFAULT     d   ALTER TABLE ONLY public."like" ALTER COLUMN id SET DEFAULT nextval('public.like_id_seq'::regclass);
 8   ALTER TABLE public."like" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            r           2604    17832    reply id    DEFAULT     d   ALTER TABLE ONLY public.reply ALTER COLUMN id SET DEFAULT nextval('public.reply_id_seq'::regclass);
 7   ALTER TABLE public.reply ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            m           2604    17820 	   thread id    DEFAULT     f   ALTER TABLE ONLY public.thread ALTER COLUMN id SET DEFAULT nextval('public.thread_id_seq'::regclass);
 8   ALTER TABLE public.thread ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            j           2604    17809    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217                       0    17796    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   B       (          0    17840    follow 
   TABLE DATA           N   COPY public.follow (id, "followersId", "followingId", "followAt") FROM stdin;
    public          postgres    false    223   &D       *          0    17848    like 
   TABLE DATA           T   COPY public."like" (id, "userId", "threadId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    225   CD       &          0    17829    reply 
   TABLE DATA           c   COPY public.reply (id, "userId", "threadId", image, content, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   `D       $          0    17817    thread 
   TABLE DATA           v   COPY public.thread (id, content, "totalReplies", "userId", "createdAt", "updatedAt", image, "totalLikes") FROM stdin;
    public          postgres    false    219   }D       "          0    17806    user 
   TABLE DATA           r   COPY public."user" (id, "fullName", username, email, avatar, bio, "createdAt", "updatedAt", password) FROM stdin;
    public          postgres    false    217   (H       8           0    0    follow_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.follow_id_seq', 56, true);
          public          postgres    false    222            9           0    0    like_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.like_id_seq', 15, true);
          public          postgres    false    224            :           0    0    reply_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.reply_id_seq', 9, true);
          public          postgres    false    220            ;           0    0    thread_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.thread_id_seq', 49, true);
          public          postgres    false    218            <           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 52, true);
          public          postgres    false    216            {           2606    17804 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            �           2606    17846    follow follow_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.follow
    ADD CONSTRAINT follow_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.follow DROP CONSTRAINT follow_pkey;
       public            postgres    false    223            �           2606    17855    like like_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."like"
    ADD CONSTRAINT like_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."like" DROP CONSTRAINT like_pkey;
       public            postgres    false    225            �           2606    17838    reply reply_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.reply
    ADD CONSTRAINT reply_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.reply DROP CONSTRAINT reply_pkey;
       public            postgres    false    221            �           2606    17827    thread thread_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.thread
    ADD CONSTRAINT thread_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.thread DROP CONSTRAINT thread_pkey;
       public            postgres    false    219            ~           2606    17815    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    217            �           1259    17857 "   follow_followersId_followingId_key    INDEX     v   CREATE UNIQUE INDEX "follow_followersId_followingId_key" ON public.follow USING btree ("followersId", "followingId");
 8   DROP INDEX public."follow_followersId_followingId_key";
       public            postgres    false    223    223            �           1259    17858    like_userId_threadId_key    INDEX     d   CREATE UNIQUE INDEX "like_userId_threadId_key" ON public."like" USING btree ("userId", "threadId");
 .   DROP INDEX public."like_userId_threadId_key";
       public            postgres    false    225    225            |           1259    17856    user_email_key    INDEX     I   CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);
 "   DROP INDEX public.user_email_key;
       public            postgres    false    217                       1259    20982    user_username_key    INDEX     O   CREATE UNIQUE INDEX user_username_key ON public."user" USING btree (username);
 %   DROP INDEX public.user_username_key;
       public            postgres    false    217            �           2606    17874    follow follow_followersId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.follow
    ADD CONSTRAINT "follow_followersId_fkey" FOREIGN KEY ("followersId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public.follow DROP CONSTRAINT "follow_followersId_fkey";
       public          postgres    false    4734    223    217            �           2606    17879    follow follow_followingId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.follow
    ADD CONSTRAINT "follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public.follow DROP CONSTRAINT "follow_followingId_fkey";
       public          postgres    false    223    4734    217            �           2606    17889    like like_threadId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."like"
    ADD CONSTRAINT "like_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES public.thread(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."like" DROP CONSTRAINT "like_threadId_fkey";
       public          postgres    false    4737    219    225            �           2606    17884    like like_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."like"
    ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public."like" DROP CONSTRAINT "like_userId_fkey";
       public          postgres    false    225    217    4734            �           2606    17869    reply reply_threadId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reply
    ADD CONSTRAINT "reply_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES public.thread(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.reply DROP CONSTRAINT "reply_threadId_fkey";
       public          postgres    false    219    221    4737            �           2606    17864    reply reply_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reply
    ADD CONSTRAINT "reply_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public.reply DROP CONSTRAINT "reply_userId_fkey";
       public          postgres    false    217    4734    221            �           2606    17859    thread thread_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.thread
    ADD CONSTRAINT "thread_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.thread DROP CONSTRAINT "thread_userId_fkey";
       public          postgres    false    219    4734    217                  x�}�kjA��"�C=Zji��+1����?��Ic30tOuק*��Q�(m����U��%նc�
��r�Ŏ��K�u�6�
�G�N�'�mm�ktqZ��0~B=�H����~��k�\\�|s�|�>���8\�<�Մ�/r<B����]j�t6)>q�n�ة��H��Hwĭ���Qb�̅`��l���Y����X���#�cΛ����߬����p���Zr����Y�l���@�Fa�,6p����[��).�ZQHionR���>�^Q�&�'=���q�����1Ë���^h^��mj��ڥS�BK�rnϹVO�#Z�k$���d��e���h�{p�f�M���LR��o-�.��v��hV��0(d��e�N����A� �ꎒ�q	��,��<�X[!˽F�cs�z�.��(�W�?���G�1��)&������OWN����'�����1���������y�s��ys��!�����x�	��~      (      x������ � �      *      x������ � �      &      x������ � �      $   �  x���˒�6���Sh��X7�e35�E�N�R5=���A $�LV�y�<B���L�]�8e�%}��?�p<�jD�|�@�Rj98�$���{���)�,�8�8���x=M���V��B[W*#�%,l�*��"�+ՉJ�\��(W3�I�b8�>�����c߯�C5��[��.���
W�ao� ߑ8�jw��M�U�B��oߐ5�Q�F5-�1�I�����j�F�8����BӺ/ג6�vo�Zn����~i=�g�Q"1�/��wb=;?cL��!f�㷳'4y�>��t]��[��6M;�H�����GpZ��Ǎ.�(���j�vܔ�g����5�c7�;UNU3�'\��߭=zdc���ń
���� &e��C	�`!�߈�_��?�0���5�U�r9y3�b��?��D�P��B����h��4�i�UPt~�fp/l�z	�6U%4��0I3�=�^!x���.F�\��v+�����Z8�g_fe��8aW�ϙ��;\ڢ5���x��jx�9�Z�߻'�ɵ�}.�N��+Q��Ʀ��k�]ў�ɡ����|.�����R�54��Ո�����O.8	�p��K���?�'�'��5&ݱ!�?w%�p�=Y�(��ѥIq�v���T�j;/������g�2<��/Κ�D�%�!I�{.�8�	��0����܍ЛC��
'�/{���S�b���P�c�����P �D!���Cs��J��Iw��ni���Qb��$"g������K�>��@L�8z��I��NJ0;#E�%+B��E,��ٝ�O?�R,P֢�5����
B���hѤY�g@��&'��ǘ^�ߖC^��Ycͧ�L5QZlt���|h_,����"	�v�F��`�^Uo�$L�k�Iɚ��lb͍l
����v�]煋N�O���ݿ�&��      "   �  x���K��H���+r�1�!yQ1�X>(-�}N�DL$�@*��D�E��I-�U�1��սG����s�En�i^`�������Z�%��x7���Ҭh�Z$x?�8#���:�ͬ�Z���q�Ἁ�����(G.��?PjBQTQ�D��f��Ճ&Ї�>0M�d]7�o��]ZCfm#��� {��(9�p(@(�rT��}G�4G����CW�TU�����#���(J?�a~�o��� i�(�@Ehze�)rw���8J3�s��䦠6z[�ڢ�+��?A�(|j	��N���$�O�7�+�M������)B�L��?�u�z|C�93�v�;�"M8Ĕ����.�"�>M<=n�@NZR@�&i�5`gn�$��1�ն��&��/l��a�������=֝�q�p�&�q42�ոO��p��?��1l�
�&QDPL�W��^݃����E��
��$ 	���i��=~����s�T�P՛��K����t4=��ˊ��e%´���ۥ�1_��(;sd�E���٘=/�1��,�}k�+�= Ax��1���AXMӜ��D'� ����	�9������� ���??��h��>�5��k6˶��D�LG��:����������4���z�YY�0'M��s�1����xD��?9eơaYT��ֹD��=7�Jkː�@��_���hc�%� �c����d�۳��ҵ���H�%���gև(t{�lސun΀f�Sf�#W���z{)gB��m�����/pj��3�7���$$$�Nz[PxC�%_(%O��zA��b���tԪ5�ZB�IB���(NTN�D?8��J�Rm�7F���,�NA��Օ��� �Y��V�9p��I���(F��[A{��~�,�\z�w�2KP{<տ��ߑ�8�����jۯ՗��l.dGg�כ���#˕tў>�޻�4TC?�x<dQ��҅�$aWإ�yJ}�{F�sw]�#i��a���/t���/WJ2��z0KHߙ`C�&��zR|<����8�"Z�rM<�PD�f�X�N�V	�=�λ�.K��1���Ә�	}��$IR�q��=Eh"/��M�$��W%~f�vݵ�a<X�r"�ï��tlX=I�2s%���|=��p碆��=}��I��請��~�/��$��v��CѸ�_�ػ�gGZ:�jυ�XA��BF���|}��p�\�mW�̹���?�7���ƿ�"�7     