PGDMP  5    )                |        	   necroland    16.2    16.2 G    ^           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            _           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            `           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            a           1262    17189 	   necroland    DATABASE     |   CREATE DATABASE necroland WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE necroland;
             	   necroland    false            �            1259    17260 
   attraction    TABLE        CREATE TABLE public.attraction (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    category_id integer NOT NULL
);
    DROP TABLE public.attraction;
       public         heap 	   necroland    false            �            1259    17321    attraction_has_tag    TABLE     �   CREATE TABLE public.attraction_has_tag (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    attraction_id integer,
    tag_id integer
);
 &   DROP TABLE public.attraction_has_tag;
       public         heap 	   necroland    false            �            1259    17320    attraction_has_tag_id_seq    SEQUENCE     �   ALTER TABLE public.attraction_has_tag ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.attraction_has_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       	   necroland    false    236            �            1259    17259    attraction_id_seq    SEQUENCE     �   ALTER TABLE public.attraction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.attraction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       	   necroland    false    226            �            1259    17249    category    TABLE     �   CREATE TABLE public.category (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.category;
       public         heap 	   necroland    false            �            1259    17248    category_id_seq    SEQUENCE     �   ALTER TABLE public.category ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       	   necroland    false    224            �            1259    17299    message    TABLE     U  CREATE TABLE public.message (
    id integer NOT NULL,
    object text NOT NULL,
    content text NOT NULL,
    email text NOT NULL,
    lastname text NOT NULL,
    firstname text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    status_id integer DEFAULT 3 NOT NULL
);
    DROP TABLE public.message;
       public         heap 	   necroland    false            �            1259    17298    message_id_seq    SEQUENCE     �   ALTER TABLE public.message ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       	   necroland    false    232            �            1259    17285    photo    TABLE     �   CREATE TABLE public.photo (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    attraction_id integer NOT NULL
);
    DROP TABLE public.photo;
       public         heap 	   necroland    false            �            1259    17284    photo_id_seq    SEQUENCE     �   ALTER TABLE public.photo ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.photo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       	   necroland    false    230            �            1259    17314    price    TABLE     �   CREATE TABLE public.price (
    id integer NOT NULL,
    duration integer NOT NULL,
    price numeric(10,2) NOT NULL,
    hotel boolean NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.price;
       public         heap 	   necroland    false            �            1259    17313    price_id_seq    SEQUENCE     �   ALTER TABLE public.price ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.price_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       	   necroland    false    234            �            1259    17228    reservation    TABLE     "  CREATE TABLE public.reservation (
    id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    nb_people integer NOT NULL,
    hotel text NOT NULL,
    total_price numeric(10,2) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    user_id integer NOT NULL,
    status_id integer DEFAULT 1 NOT NULL,
    CONSTRAINT duration CHECK ((EXTRACT(day FROM age((end_date)::timestamp with time zone, (start_date)::timestamp with time zone)) <= (3)::numeric))
);
    DROP TABLE public.reservation;
       public         heap 	   necroland    false            �            1259    17227    reservation_id_seq    SEQUENCE     �   ALTER TABLE public.reservation ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reservation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       	   necroland    false    222            �            1259    17191    role    TABLE     �   CREATE TABLE public.role (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.role;
       public         heap 	   necroland    false            �            1259    17190    role_id_seq    SEQUENCE     �   ALTER TABLE public.role ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       	   necroland    false    216            �            1259    17219    status    TABLE     �   CREATE TABLE public.status (
    id integer NOT NULL,
    label text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.status;
       public         heap 	   necroland    false            �            1259    17218    status_id_seq    SEQUENCE     �   ALTER TABLE public.status ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       	   necroland    false    220            �            1259    17274    tag    TABLE     �   CREATE TABLE public.tag (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.tag;
       public         heap 	   necroland    false            �            1259    17273 
   tag_id_seq    SEQUENCE     �   ALTER TABLE public.tag ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       	   necroland    false    228            �            1259    17202    user    TABLE     �  CREATE TABLE public."user" (
    id integer NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    address text NOT NULL,
    postal_code text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    role_id integer DEFAULT 1 NOT NULL
);
    DROP TABLE public."user";
       public         heap 	   necroland    false            �            1259    17201    user_id_seq    SEQUENCE     �   ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       	   necroland    false    218            Q          0    17260 
   attraction 
   TABLE DATA           b   COPY public.attraction (id, name, description, "createdAt", "updatedAt", category_id) FROM stdin;
    public       	   necroland    false    226   iV       [          0    17321    attraction_has_tag 
   TABLE DATA           a   COPY public.attraction_has_tag (id, "createdAt", "updatedAt", attraction_id, tag_id) FROM stdin;
    public       	   necroland    false    236   �[       O          0    17249    category 
   TABLE DATA           F   COPY public.category (id, name, "createdAt", "updatedAt") FROM stdin;
    public       	   necroland    false    224   �[       W          0    17299    message 
   TABLE DATA           w   COPY public.message (id, object, content, email, lastname, firstname, "createdAt", "updatedAt", status_id) FROM stdin;
    public       	   necroland    false    232   o\       U          0    17285    photo 
   TABLE DATA           R   COPY public.photo (id, name, "createdAt", "updatedAt", attraction_id) FROM stdin;
    public       	   necroland    false    230   �\       Y          0    17314    price 
   TABLE DATA           U   COPY public.price (id, duration, price, hotel, "createdAt", "updatedAt") FROM stdin;
    public       	   necroland    false    234   �\       M          0    17228    reservation 
   TABLE DATA           �   COPY public.reservation (id, start_date, end_date, nb_people, hotel, total_price, "createdAt", "updatedAt", user_id, status_id) FROM stdin;
    public       	   necroland    false    222   ]       G          0    17191    role 
   TABLE DATA           B   COPY public.role (id, name, "createdAt", "updatedAt") FROM stdin;
    public       	   necroland    false    216   8]       K          0    17219    status 
   TABLE DATA           E   COPY public.status (id, label, "createdAt", "updatedAt") FROM stdin;
    public       	   necroland    false    220   �]       S          0    17274    tag 
   TABLE DATA           A   COPY public.tag (id, name, "createdAt", "updatedAt") FROM stdin;
    public       	   necroland    false    228   	^       I          0    17202    user 
   TABLE DATA           �   COPY public."user" (id, firstname, lastname, address, postal_code, city, country, email, password, "createdAt", "updatedAt", role_id) FROM stdin;
    public       	   necroland    false    218   _       b           0    0    attraction_has_tag_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.attraction_has_tag_id_seq', 1, false);
          public       	   necroland    false    235            c           0    0    attraction_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.attraction_id_seq', 6, true);
          public       	   necroland    false    225            d           0    0    category_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.category_id_seq', 3, true);
          public       	   necroland    false    223            e           0    0    message_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.message_id_seq', 1, false);
          public       	   necroland    false    231            f           0    0    photo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.photo_id_seq', 1, false);
          public       	   necroland    false    229            g           0    0    price_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.price_id_seq', 7, true);
          public       	   necroland    false    233            h           0    0    reservation_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.reservation_id_seq', 1, false);
          public       	   necroland    false    221            i           0    0    role_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.role_id_seq', 2, true);
          public       	   necroland    false    215            j           0    0    status_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.status_id_seq', 4, true);
          public       	   necroland    false    219            k           0    0 
   tag_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.tag_id_seq', 16, true);
          public       	   necroland    false    227            l           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 1, false);
          public       	   necroland    false    217            �           2606    17326 *   attraction_has_tag attraction_has_tag_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.attraction_has_tag
    ADD CONSTRAINT attraction_has_tag_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.attraction_has_tag DROP CONSTRAINT attraction_has_tag_pkey;
       public         	   necroland    false    236            �           2606    17267    attraction attraction_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.attraction
    ADD CONSTRAINT attraction_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.attraction DROP CONSTRAINT attraction_pkey;
       public         	   necroland    false    226            �           2606    17258    category category_name_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_name_key UNIQUE (name);
 D   ALTER TABLE ONLY public.category DROP CONSTRAINT category_name_key;
       public         	   necroland    false    224            �           2606    17256    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public         	   necroland    false    224            �           2606    17307    message message_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.message DROP CONSTRAINT message_pkey;
       public         	   necroland    false    232            �           2606    17292    photo photo_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.photo
    ADD CONSTRAINT photo_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.photo DROP CONSTRAINT photo_pkey;
       public         	   necroland    false    230            �           2606    17319    price price_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.price
    ADD CONSTRAINT price_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.price DROP CONSTRAINT price_pkey;
       public         	   necroland    false    234            �           2606    17237    reservation reservation_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.reservation DROP CONSTRAINT reservation_pkey;
       public         	   necroland    false    222            �           2606    17200    role role_name_key 
   CONSTRAINT     M   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_name_key UNIQUE (name);
 <   ALTER TABLE ONLY public.role DROP CONSTRAINT role_name_key;
       public         	   necroland    false    216            �           2606    17198    role role_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public         	   necroland    false    216            �           2606    17226    status status_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.status DROP CONSTRAINT status_pkey;
       public         	   necroland    false    220            �           2606    17283    tag tag_name_key 
   CONSTRAINT     K   ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_name_key UNIQUE (name);
 :   ALTER TABLE ONLY public.tag DROP CONSTRAINT tag_name_key;
       public         	   necroland    false    228            �           2606    17281    tag tag_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.tag DROP CONSTRAINT tag_pkey;
       public         	   necroland    false    228            �           2606    17212    user user_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_email_key;
       public         	   necroland    false    218            �           2606    17210    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public         	   necroland    false    218            �           2606    17268 &   attraction attraction_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attraction
    ADD CONSTRAINT attraction_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id);
 P   ALTER TABLE ONLY public.attraction DROP CONSTRAINT attraction_category_id_fkey;
       public       	   necroland    false    224    226    4768            �           2606    17327 8   attraction_has_tag attraction_has_tag_attraction_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attraction_has_tag
    ADD CONSTRAINT attraction_has_tag_attraction_id_fkey FOREIGN KEY (attraction_id) REFERENCES public.attraction(id);
 b   ALTER TABLE ONLY public.attraction_has_tag DROP CONSTRAINT attraction_has_tag_attraction_id_fkey;
       public       	   necroland    false    226    236    4770            �           2606    17332 1   attraction_has_tag attraction_has_tag_tag_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attraction_has_tag
    ADD CONSTRAINT attraction_has_tag_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id);
 [   ALTER TABLE ONLY public.attraction_has_tag DROP CONSTRAINT attraction_has_tag_tag_id_fkey;
       public       	   necroland    false    228    236    4774            �           2606    17308    message message_status_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.status(id);
 H   ALTER TABLE ONLY public.message DROP CONSTRAINT message_status_id_fkey;
       public       	   necroland    false    232    220    4762            �           2606    17293    photo photo_attraction_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.photo
    ADD CONSTRAINT photo_attraction_id_fkey FOREIGN KEY (attraction_id) REFERENCES public.attraction(id);
 H   ALTER TABLE ONLY public.photo DROP CONSTRAINT photo_attraction_id_fkey;
       public       	   necroland    false    4770    226    230            �           2606    17243 &   reservation reservation_status_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.status(id);
 P   ALTER TABLE ONLY public.reservation DROP CONSTRAINT reservation_status_id_fkey;
       public       	   necroland    false    4762    222    220            �           2606    17238 $   reservation reservation_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);
 N   ALTER TABLE ONLY public.reservation DROP CONSTRAINT reservation_user_id_fkey;
       public       	   necroland    false    222    218    4760            �           2606    17213    user user_role_id_fkey    FK CONSTRAINT     v   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id);
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_role_id_fkey;
       public       	   necroland    false    218    4756    216            Q   d  x��V�rG����R��$�TJ\�)G�L����d8ۻivf5D�k��P�����_��4X]�b �}��g6�$]�7ބ�3�ѕ��{Ui��;���D�d���cU<)���e��)���S�cE�C!��X�%)j���S�J�9|�b���TEؑT�¤���r&�j��W�&�刕Œ.�������<%H��C��_֖�S������%�$�ʊᄒ­��V�z�ė6��#~$�b���G�]���՜�;Vf��\����@�mS��npэ���!Q���X���I:	��aR_�N���'Ӌ�م��xu~�jv>y~~q�����������t�-�U�U��*|L��@cA�Hٛ՟��c�H!P�%"}�(R�ta	��m��:�L�:ۅ��R��~Lԯ���<��
c�ǟ]�O��A�)��.e�<���$L�tf���4�%��9WZ�?�l֭f��6 @�S�i�1�v���$�:2�6$� ���%#H�a+n=wh��M@�%��&�~���h���~9t�h]e��F����������4�aC�)��Pn�^|������	^������fJ��Q�W�3���Pj�l��wkN��E� �H�9��ZTU�N�����H����V�[�)|��e(�Q֭άk�����!2�������t�j�������{�s��$����`TwP:���Fq`�Dp#A�J(�Ad����-�u���i�Q��!����Say$d�����pg>�$ݰ�D�Z�E_1�?
+Q�d���1��~�� "tEW��"���,�m[4
�^�s�BH�����D}�BLۜq> g'���THoh�����v�e��,<'Se��p���f��bQ�pzǚ�[2�i#���/!�)9̇�s~�ON'��x��m�>�l	1�e��(�������NX�O3��5�y�}D�Oa�	�}1b�{'ծ��Y�~���yug�-�Y^R�(g�B���`[�c��x0B۰u���T�o����F�>[a�aG#�B�����;T���ں�<T]\#c�����ON��ҍ�!�[b䏉���&�}��6WVub�������ѕ���G�f�_[�-;��C��c[���1橬X���/�����������%og;.E+��<���D �	��hltwx�!�
?@�*����M���Y��������Ņ��v���L��Ʊ`�Y[�C{('���)6���aþ&E�6�n.O���${p\S��	��*����HOԏ� ��݌~��p?SZD�Z9X���ZĘ�\�H:�p�3AtmP4*|ȡ�&E�yiЭ�����=�q=����W      [      x������ � �      O   e   x�3����I-J�O,.I-�4202�50�54U04�21�24�3315�0�60���2�J-.I,-J�+!�ژӵ���ʢ�Լ�T����Ԣ�̲T�c���� ��'I      W      x������ � �      U      x������ � �      Y   b   x��λ�0�x]9�u{QS�K.��G�G=���W���8N��޺�c�}���dm00����#+�)�%y��>%�މzLI���n��a<K      M      x������ � �      G   I   x�3��M�M*J�4202�50�54U04�21�24�3315�0�60���2�tL����,.)J,I--"�#F��� k0      K   h   x�3�t��K�,�=�2�����D��T��T��������D������\���3Əˈ�1/�4�(�Ɯ�y
���E�
)�
%E��%���y%�u�p��T^IXi� �/�      S   �   x���Kn�0E�/��Ŏ� �!1�N*u�Ĥ&<)��j��udcuW�7?�}��p����@�Bn�z�k�ۃ�\nYW���p{/��~�	�pW�����2�uCB�Ǡ=�:�zҔ55#z4��n�U�D����zuw��n��2�f�N$e���2;��֠|p��	�#A��՚��cp�{��^����F�9��b��@`|D��2��.��"%$.�sמ�播I�P�����u�-���~�
      I      x������ � �     