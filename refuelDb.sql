PGDMP     /                    z            refuelDb    12.9    12.9 9    V           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            W           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            X           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            Y           1262    58496    refuelDb    DATABASE     ?   CREATE DATABASE "refuelDb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
    DROP DATABASE "refuelDb";
                postgres    false            ?            1259    58508 	   categoria    TABLE     #  CREATE TABLE public.categoria (
    cat_id integer NOT NULL,
    cat_nombre character varying,
    cat_descripcion character varying,
    image text DEFAULT 'https://images.pexels.com/photos/9796/car-refill-transportation-transport.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'::text
);
    DROP TABLE public.categoria;
       public         heap    postgres    false            ?            1259    58506    categoría_cat_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."categoría_cat_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."categoría_cat_id_seq";
       public          postgres    false    203            Z           0    0    categoría_cat_id_seq    SEQUENCE OWNED BY     P   ALTER SEQUENCE public."categoría_cat_id_seq" OWNED BY public.categoria.cat_id;
          public          postgres    false    202            ?            1259    58517    comprobante    TABLE     p  CREATE TABLE public.comprobante (
    com_id integer NOT NULL,
    com_nombre character varying,
    com_numero_inicial integer,
    com_numero_fin integer,
    com_cant_digitos integer,
    com_serie character varying,
    com_timbrado character varying,
    com_fecha_inicio_vigencia date,
    com_fecha_fin_vigencia date,
    com_numero_actual integer DEFAULT 1
);
    DROP TABLE public.comprobante;
       public         heap    postgres    false            ?            1259    58515    comprobante_com_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.comprobante_com_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.comprobante_com_id_seq;
       public          postgres    false    205            [           0    0    comprobante_com_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.comprobante_com_id_seq OWNED BY public.comprobante.com_id;
          public          postgres    false    204            ?            1259    58526    detalle_pedido    TABLE     u  CREATE TABLE public.detalle_pedido (
    det_id integer NOT NULL,
    det_id_pedido integer NOT NULL,
    det_id_producto integer,
    det_precio_unitario numeric,
    det_total_parcial numeric,
    det_cantidad numeric,
    det_valor_iva numeric,
    det_total_general numeric,
    det_iva_porcentaje integer,
    det_estado integer DEFAULT 2,
    det_observacion text
);
 "   DROP TABLE public.detalle_pedido;
       public         heap    postgres    false            ?            1259    58524    detalle_pedido_det_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.detalle_pedido_det_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.detalle_pedido_det_id_seq;
       public          postgres    false    207            \           0    0    detalle_pedido_det_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.detalle_pedido_det_id_seq OWNED BY public.detalle_pedido.det_id;
          public          postgres    false    206            ?            1259    74697    formaDePago    TABLE     f   CREATE TABLE public."formaDePago" (
    "fp_Id" integer NOT NULL,
    fp_descripcion text NOT NULL
);
 !   DROP TABLE public."formaDePago";
       public         heap    postgres    false            ?            1259    74695    formaDePago_fp_Id_seq    SEQUENCE     ?   CREATE SEQUENCE public."formaDePago_fp_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."formaDePago_fp_Id_seq";
       public          postgres    false    215            ]           0    0    formaDePago_fp_Id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."formaDePago_fp_Id_seq" OWNED BY public."formaDePago"."fp_Id";
          public          postgres    false    214            ?            1259    58544    pedido    TABLE     {  CREATE TABLE public.pedido (
    ped_id integer NOT NULL,
    ped_id_cliente integer,
    ped_fecha date,
    ped_id_comprobante integer,
    ped_fecha_inicio_vigencia date,
    ped_fecha_fin_vigencia date,
    ped_num_comprobante character varying,
    ped_timbrado character varying,
    ped_total_general numeric,
    ped_estado integer,
    gps text,
    ped_pago integer
);
    DROP TABLE public.pedido;
       public         heap    postgres    false            ?            1259    58542    pedido_ped_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.pedido_ped_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.pedido_ped_id_seq;
       public          postgres    false    209            ^           0    0    pedido_ped_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.pedido_ped_id_seq OWNED BY public.pedido.ped_id;
          public          postgres    false    208            ?            1259    58562    producto    TABLE     8  CREATE TABLE public.producto (
    pro_id integer NOT NULL,
    cat_id integer,
    pro_precio numeric,
    pro_descripcion character varying,
    pro_iva numeric,
    image text DEFAULT 'https://www.suzukijember.com/gallery/gambar_product/default.jpg'::text,
    "pro_empresaId" integer,
    pro_nombre text
);
    DROP TABLE public.producto;
       public         heap    postgres    false            ?            1259    58560    producto_pro_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.producto_pro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.producto_pro_id_seq;
       public          postgres    false    211            _           0    0    producto_pro_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.producto_pro_id_seq OWNED BY public.producto.pro_id;
          public          postgres    false    210            ?            1259    58571    usuarios    TABLE     _  CREATE TABLE public.usuarios (
    usu_id integer NOT NULL,
    usu_nombre character varying,
    usu_telefono character varying,
    usu_email character varying,
    usu_password character varying,
    usu_fecha timestamp without time zone,
    usu_imagen text,
    usu_documento text,
    usu_token text,
    usu_rol text DEFAULT 'usuario'::text
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            ?            1259    58569    usuarios_usu_codigo_seq    SEQUENCE     ?   CREATE SEQUENCE public.usuarios_usu_codigo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.usuarios_usu_codigo_seq;
       public          postgres    false    213            `           0    0    usuarios_usu_codigo_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.usuarios_usu_codigo_seq OWNED BY public.usuarios.usu_id;
          public          postgres    false    212            ?
           2604    58511    categoria cat_id    DEFAULT     w   ALTER TABLE ONLY public.categoria ALTER COLUMN cat_id SET DEFAULT nextval('public."categoría_cat_id_seq"'::regclass);
 ?   ALTER TABLE public.categoria ALTER COLUMN cat_id DROP DEFAULT;
       public          postgres    false    202    203    203            ?
           2604    58520    comprobante com_id    DEFAULT     x   ALTER TABLE ONLY public.comprobante ALTER COLUMN com_id SET DEFAULT nextval('public.comprobante_com_id_seq'::regclass);
 A   ALTER TABLE public.comprobante ALTER COLUMN com_id DROP DEFAULT;
       public          postgres    false    205    204    205            ?
           2604    58529    detalle_pedido det_id    DEFAULT     ~   ALTER TABLE ONLY public.detalle_pedido ALTER COLUMN det_id SET DEFAULT nextval('public.detalle_pedido_det_id_seq'::regclass);
 D   ALTER TABLE public.detalle_pedido ALTER COLUMN det_id DROP DEFAULT;
       public          postgres    false    206    207    207            ?
           2604    74700    formaDePago fp_Id    DEFAULT     |   ALTER TABLE ONLY public."formaDePago" ALTER COLUMN "fp_Id" SET DEFAULT nextval('public."formaDePago_fp_Id_seq"'::regclass);
 D   ALTER TABLE public."formaDePago" ALTER COLUMN "fp_Id" DROP DEFAULT;
       public          postgres    false    214    215    215            ?
           2604    58547    pedido ped_id    DEFAULT     n   ALTER TABLE ONLY public.pedido ALTER COLUMN ped_id SET DEFAULT nextval('public.pedido_ped_id_seq'::regclass);
 <   ALTER TABLE public.pedido ALTER COLUMN ped_id DROP DEFAULT;
       public          postgres    false    209    208    209            ?
           2604    58565    producto pro_id    DEFAULT     r   ALTER TABLE ONLY public.producto ALTER COLUMN pro_id SET DEFAULT nextval('public.producto_pro_id_seq'::regclass);
 >   ALTER TABLE public.producto ALTER COLUMN pro_id DROP DEFAULT;
       public          postgres    false    210    211    211            ?
           2604    58574    usuarios usu_id    DEFAULT     v   ALTER TABLE ONLY public.usuarios ALTER COLUMN usu_id SET DEFAULT nextval('public.usuarios_usu_codigo_seq'::regclass);
 >   ALTER TABLE public.usuarios ALTER COLUMN usu_id DROP DEFAULT;
       public          postgres    false    213    212    213            G          0    58508 	   categoria 
   TABLE DATA           O   COPY public.categoria (cat_id, cat_nombre, cat_descripcion, image) FROM stdin;
    public          postgres    false    203   ?F       I          0    58517    comprobante 
   TABLE DATA           ?   COPY public.comprobante (com_id, com_nombre, com_numero_inicial, com_numero_fin, com_cant_digitos, com_serie, com_timbrado, com_fecha_inicio_vigencia, com_fecha_fin_vigencia, com_numero_actual) FROM stdin;
    public          postgres    false    205   ?G       K          0    58526    detalle_pedido 
   TABLE DATA           ?   COPY public.detalle_pedido (det_id, det_id_pedido, det_id_producto, det_precio_unitario, det_total_parcial, det_cantidad, det_valor_iva, det_total_general, det_iva_porcentaje, det_estado, det_observacion) FROM stdin;
    public          postgres    false    207   ?G       S          0    74697    formaDePago 
   TABLE DATA           @   COPY public."formaDePago" ("fp_Id", fp_descripcion) FROM stdin;
    public          postgres    false    215   ?H       M          0    58544    pedido 
   TABLE DATA           ?   COPY public.pedido (ped_id, ped_id_cliente, ped_fecha, ped_id_comprobante, ped_fecha_inicio_vigencia, ped_fecha_fin_vigencia, ped_num_comprobante, ped_timbrado, ped_total_general, ped_estado, gps, ped_pago) FROM stdin;
    public          postgres    false    209   !I       O          0    58562    producto 
   TABLE DATA           |   COPY public.producto (pro_id, cat_id, pro_precio, pro_descripcion, pro_iva, image, "pro_empresaId", pro_nombre) FROM stdin;
    public          postgres    false    211   ?I       Q          0    58571    usuarios 
   TABLE DATA           ?   COPY public.usuarios (usu_id, usu_nombre, usu_telefono, usu_email, usu_password, usu_fecha, usu_imagen, usu_documento, usu_token, usu_rol) FROM stdin;
    public          postgres    false    213   }K       a           0    0    categoría_cat_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."categoría_cat_id_seq"', 12, true);
          public          postgres    false    202            b           0    0    comprobante_com_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.comprobante_com_id_seq', 3, true);
          public          postgres    false    204            c           0    0    detalle_pedido_det_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.detalle_pedido_det_id_seq', 34, true);
          public          postgres    false    206            d           0    0    formaDePago_fp_Id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."formaDePago_fp_Id_seq"', 8, true);
          public          postgres    false    214            e           0    0    pedido_ped_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.pedido_ped_id_seq', 55, true);
          public          postgres    false    208            f           0    0    producto_pro_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.producto_pro_id_seq', 42, true);
          public          postgres    false    210            g           0    0    usuarios_usu_codigo_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.usuarios_usu_codigo_seq', 35, true);
          public          postgres    false    212            ?
           2606    58579    categoria categoría_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT "categoría_pkey" PRIMARY KEY (cat_id);
 E   ALTER TABLE ONLY public.categoria DROP CONSTRAINT "categoría_pkey";
       public            postgres    false    203            ?
           2606    58581    comprobante comprobante_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.comprobante
    ADD CONSTRAINT comprobante_pkey PRIMARY KEY (com_id);
 F   ALTER TABLE ONLY public.comprobante DROP CONSTRAINT comprobante_pkey;
       public            postgres    false    205            ?
           2606    58583 "   detalle_pedido datelle_pedido_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT datelle_pedido_pkey PRIMARY KEY (det_id);
 L   ALTER TABLE ONLY public.detalle_pedido DROP CONSTRAINT datelle_pedido_pkey;
       public            postgres    false    207            ?
           2606    74705    formaDePago formaDePago_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public."formaDePago"
    ADD CONSTRAINT "formaDePago_pkey" PRIMARY KEY ("fp_Id");
 J   ALTER TABLE ONLY public."formaDePago" DROP CONSTRAINT "formaDePago_pkey";
       public            postgres    false    215            ?
           2606    58589    pedido pedido_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_pkey PRIMARY KEY (ped_id);
 <   ALTER TABLE ONLY public.pedido DROP CONSTRAINT pedido_pkey;
       public            postgres    false    209            ?
           2606    58591    producto producto_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (pro_id);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public            postgres    false    211            ?
           2606    58593    usuarios usuarios_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usu_id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    213            ?
           2606    58594    producto fk_cat_producto_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_cat_producto_id FOREIGN KEY (cat_id) REFERENCES public.categoria(cat_id);
 E   ALTER TABLE ONLY public.producto DROP CONSTRAINT fk_cat_producto_id;
       public          postgres    false    2743    203    211            ?
           2606    66495    producto fk_empresa_combustible    FK CONSTRAINT     ?   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_empresa_combustible FOREIGN KEY ("pro_empresaId") REFERENCES public.usuarios(usu_id) NOT VALID;
 I   ALTER TABLE ONLY public.producto DROP CONSTRAINT fk_empresa_combustible;
       public          postgres    false    211    2753    213            ?
           2606    58599    detalle_pedido fk_id_pedido    FK CONSTRAINT     ?   ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT fk_id_pedido FOREIGN KEY (det_id_pedido) REFERENCES public.pedido(ped_id) NOT VALID;
 E   ALTER TABLE ONLY public.detalle_pedido DROP CONSTRAINT fk_id_pedido;
       public          postgres    false    2749    207    209            ?
           2606    58604    detalle_pedido fk_id_producto    FK CONSTRAINT     ?   ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT fk_id_producto FOREIGN KEY (det_id_producto) REFERENCES public.producto(pro_id) NOT VALID;
 G   ALTER TABLE ONLY public.detalle_pedido DROP CONSTRAINT fk_id_producto;
       public          postgres    false    207    2751    211            G   ?   x???1k?0?g?Wdq7?I??B!?J?,Y?Ȳd??-!=U?
?u2?7??	?!???p?DSt?"bH/??R@f?F*?@'ZB???zC???rJ?g=?LP?Ы??3?s??U??[?w??!??ѢV???t??J?ԙD?<?;??????^???? a?_??p9?{?????y??o????ґ???q?X'??G??	????TU?z8g?՞??)M???wh????J      I   R   x?-?1
?0뽿D???+?4!(??????0Ì????:e?lYGm??+?D???0?)?%͂2оe???RyZ      K   ?   x??QIr!<??bڀ??????U?~$4??J(hI=?i???????pR?WJ???,A??;??N?Zlܼ??֛??{????Ii_,1Yw
X
0?????U
?ͨn*Gj;???Q?/?o?՝$#?/?y?r?H&?w?>?=Ⅺ??˻???m?^$?"?(#`?#D??nI55c???#]???
W\B?RX(??????}?1???c??!=?D?\yY?      S   6   x?3?tMKM.?,??2?I,?J-I?2?t,,?THL?????+M-K?????? F[      M   ?   x????? D???%?5??
?k???"d[?O?r? $???7˷E????M?X??HR?Qi?ZJ?	ĕ???*!p?y???n`U????׵aJ?1Y+?4?*LA????A?`???<?-?d(^?|!?`X?/???`?? ???V???,?T?(????+??8?8???w\??$?q      O   ?  x????J?0???S??'M??v???ԋGAf۱?5MB?Z?7??/??/fZP?QC??@f2??'"?gٜ\-??]Xp?[:?Q'P!?m?????bxn?N!?*?)??h???1?R???膭???V??)?-?J8? 0??s?=?\??7?????tV????lxoK?*?;#5T-??8?Q???QĘ???9ʒ???'??*g׋]? ?IJ?$?{r?z3?^?o???^??Y??:?AJ???%?[cuՕ?Wx?tlmjrS?d??!??Q?	w?~Q8_2O???ξ
u%??p~?	5??/tڑ)?"?????F????+?T?7?|?{6???~??D????q?9?a??????????M??? 3<?փ??.|      Q   ?  x??Uko?@?L@3??~?.??
?[P4M?%?????????MMvr	?wιs?2???????4??h??$??o??,1?????m'?0??ϼ?upѨ??U???焣p??Gꡚ???đU^?k"?6A??h????z?җ?1??qFF?S?aέe???R_?G?????6???Z? 긆Y?5_?c?g֮??HG?;????J?Ld???N????BH?Q?@?Ľk;?oHc@?H?, ?NQ+E?\?;ujp(??5?5#???Ȉ
͈??	?\?X3?rd??R?z&?m??a/???Xy?ܝ??.??w?????E(D??u?N???}8?WҳB7?&i4R?S?{?KO??_?;>p??˾?$}{"Ų[?v]?mw?i?&??fM?V?>?Z??Xx݁?w`?:???`?a2??܆Ci?Ѹ??-???"?{Y??t??????E?H??[i9? ?D????"??i?zo????U?LN??7?{]Z6]JG???R:F?BǠ}f|?l?????<?U??lr??|@k???s?wX??
???j?4?P?`?C2??؛w???9?\>?|0??e?y??鯷	{u??k??oO?©?YD????Jm??i[Іf:&b?ִtZ^????6d???̺?*?ʤu??^?>??K????(p???poW|r??@???~w?ST??)
u???)%UU?N&?,???/??K??bo??x%G؏?u7~zu?iq??~xx???     