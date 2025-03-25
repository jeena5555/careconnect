--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2025-03-02 15:57:31 +07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 27622)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 868 (class 1247 OID 27638)
-- Name: BloodGroup; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."BloodGroup" AS ENUM (
    'A',
    'B',
    'AB',
    'O'
);


ALTER TYPE public."BloodGroup" OWNER TO postgres;

--
-- TOC entry 865 (class 1247 OID 27632)
-- Name: Gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE'
);


ALTER TYPE public."Gender" OWNER TO postgres;

--
-- TOC entry 862 (class 1247 OID 27624)
-- Name: Prefix; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Prefix" AS ENUM (
    'MR',
    'MRS',
    'MISS'
);


ALTER TYPE public."Prefix" OWNER TO postgres;

--
-- TOC entry 877 (class 1247 OID 27662)
-- Name: PrescriptionStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PrescriptionStatus" AS ENUM (
    'MedicationGiven',
    'MedicationNotGiven'
);


ALTER TYPE public."PrescriptionStatus" OWNER TO postgres;

--
-- TOC entry 871 (class 1247 OID 27648)
-- Name: ROLE; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ROLE" AS ENUM (
    'PATIENT',
    'DOCTOR',
    'NURSE'
);


ALTER TYPE public."ROLE" OWNER TO postgres;

--
-- TOC entry 874 (class 1247 OID 27656)
-- Name: Status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Status" AS ENUM (
    'NotTreated',
    'Treated'
);


ALTER TYPE public."Status" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 27668)
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    id integer NOT NULL,
    "accountName" text NOT NULL,
    password text NOT NULL,
    role public."ROLE" NOT NULL
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 27667)
-- Name: Account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Account_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Account_id_seq" OWNER TO postgres;

--
-- TOC entry 3747 (class 0 OID 0)
-- Dependencies: 215
-- Name: Account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Account_id_seq" OWNED BY public."Account".id;


--
-- TOC entry 228 (class 1259 OID 27723)
-- Name: Appointment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Appointment" (
    id integer NOT NULL,
    "appointmentDate" timestamp(3) without time zone NOT NULL,
    "appointmentStartTime" text NOT NULL,
    "appointmentEndTime" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "patientId" integer NOT NULL,
    "doctorId" integer NOT NULL,
    symptom text NOT NULL,
    "appointmentStatus" public."Status" NOT NULL
);


ALTER TABLE public."Appointment" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 27722)
-- Name: Appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Appointment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Appointment_id_seq" OWNER TO postgres;

--
-- TOC entry 3748 (class 0 OID 0)
-- Dependencies: 227
-- Name: Appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Appointment_id_seq" OWNED BY public."Appointment".id;


--
-- TOC entry 224 (class 1259 OID 27705)
-- Name: Department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Department" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Department" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 27704)
-- Name: Department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Department_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Department_id_seq" OWNER TO postgres;

--
-- TOC entry 3749 (class 0 OID 0)
-- Dependencies: 223
-- Name: Department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Department_id_seq" OWNED BY public."Department".id;


--
-- TOC entry 220 (class 1259 OID 27687)
-- Name: Doctor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Doctor" (
    id integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    address text NOT NULL,
    description text,
    "departmentId" integer NOT NULL,
    "accountId" integer NOT NULL
);


ALTER TABLE public."Doctor" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 27686)
-- Name: Doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Doctor_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Doctor_id_seq" OWNER TO postgres;

--
-- TOC entry 3750 (class 0 OID 0)
-- Dependencies: 219
-- Name: Doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Doctor_id_seq" OWNED BY public."Doctor".id;


--
-- TOC entry 237 (class 1259 OID 27766)
-- Name: Invoice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Invoice" (
    id integer NOT NULL,
    total numeric(10,2) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "appointmentId" integer NOT NULL
);


ALTER TABLE public."Invoice" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 27765)
-- Name: Invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Invoice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Invoice_id_seq" OWNER TO postgres;

--
-- TOC entry 3751 (class 0 OID 0)
-- Dependencies: 236
-- Name: Invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Invoice_id_seq" OWNED BY public."Invoice".id;


--
-- TOC entry 226 (class 1259 OID 27714)
-- Name: Medicine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Medicine" (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    price integer NOT NULL,
    "stockQuantity" integer NOT NULL,
    "expiryDate" timestamp(3) without time zone NOT NULL,
    instruction text
);


ALTER TABLE public."Medicine" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 27713)
-- Name: Medicine_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Medicine_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Medicine_id_seq" OWNER TO postgres;

--
-- TOC entry 3752 (class 0 OID 0)
-- Dependencies: 225
-- Name: Medicine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Medicine_id_seq" OWNED BY public."Medicine".id;


--
-- TOC entry 222 (class 1259 OID 27696)
-- Name: Nurse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Nurse" (
    id integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    address text NOT NULL,
    "accountId" integer NOT NULL
);


ALTER TABLE public."Nurse" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 27695)
-- Name: Nurse_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Nurse_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Nurse_id_seq" OWNER TO postgres;

--
-- TOC entry 3753 (class 0 OID 0)
-- Dependencies: 221
-- Name: Nurse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Nurse_id_seq" OWNED BY public."Nurse".id;


--
-- TOC entry 218 (class 1259 OID 27677)
-- Name: Patient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Patient" (
    id integer NOT NULL,
    prefix public."Prefix" NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "personalId" text NOT NULL,
    gender public."Gender" NOT NULL,
    nationality text NOT NULL,
    dob timestamp(3) without time zone NOT NULL,
    height double precision NOT NULL,
    weight double precision NOT NULL,
    "bloodGroup" public."BloodGroup" NOT NULL,
    phone text NOT NULL,
    address text NOT NULL,
    allergy text NOT NULL,
    "registrationDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "accountId" integer NOT NULL
);


ALTER TABLE public."Patient" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 27676)
-- Name: Patient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Patient_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Patient_id_seq" OWNER TO postgres;

--
-- TOC entry 3754 (class 0 OID 0)
-- Dependencies: 217
-- Name: Patient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Patient_id_seq" OWNED BY public."Patient".id;


--
-- TOC entry 230 (class 1259 OID 27733)
-- Name: Prescription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Prescription" (
    id integer NOT NULL,
    "prescriptionDetail" text NOT NULL,
    "prescriptionDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "appointmentId" integer NOT NULL,
    "prescriptionStatus" public."PrescriptionStatus" NOT NULL
);


ALTER TABLE public."Prescription" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 27742)
-- Name: PrescriptionMedicines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PrescriptionMedicines" (
    "prescriptionId" integer NOT NULL,
    "medicineId" integer NOT NULL,
    quantity integer NOT NULL,
    duration integer NOT NULL
);


ALTER TABLE public."PrescriptionMedicines" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 27732)
-- Name: Prescription_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Prescription_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Prescription_id_seq" OWNER TO postgres;

--
-- TOC entry 3755 (class 0 OID 0)
-- Dependencies: 229
-- Name: Prescription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Prescription_id_seq" OWNED BY public."Prescription".id;


--
-- TOC entry 235 (class 1259 OID 27757)
-- Name: Treatment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Treatment" (
    id integer NOT NULL,
    "treatmentTypeId" integer NOT NULL,
    details text NOT NULL,
    diagnose text NOT NULL,
    "appointmentId" integer NOT NULL
);


ALTER TABLE public."Treatment" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 27748)
-- Name: TreatmentType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TreatmentType" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    cost integer NOT NULL
);


ALTER TABLE public."TreatmentType" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 27747)
-- Name: TreatmentType_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TreatmentType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TreatmentType_id_seq" OWNER TO postgres;

--
-- TOC entry 3756 (class 0 OID 0)
-- Dependencies: 232
-- Name: TreatmentType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TreatmentType_id_seq" OWNED BY public."TreatmentType".id;


--
-- TOC entry 234 (class 1259 OID 27756)
-- Name: Treatment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Treatment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Treatment_id_seq" OWNER TO postgres;

--
-- TOC entry 3757 (class 0 OID 0)
-- Dependencies: 234
-- Name: Treatment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Treatment_id_seq" OWNED BY public."Treatment".id;


--
-- TOC entry 3515 (class 2604 OID 27671)
-- Name: Account id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account" ALTER COLUMN id SET DEFAULT nextval('public."Account_id_seq"'::regclass);


--
-- TOC entry 3522 (class 2604 OID 27726)
-- Name: Appointment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Appointment" ALTER COLUMN id SET DEFAULT nextval('public."Appointment_id_seq"'::regclass);


--
-- TOC entry 3520 (class 2604 OID 27708)
-- Name: Department id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Department" ALTER COLUMN id SET DEFAULT nextval('public."Department_id_seq"'::regclass);


--
-- TOC entry 3518 (class 2604 OID 27690)
-- Name: Doctor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Doctor" ALTER COLUMN id SET DEFAULT nextval('public."Doctor_id_seq"'::regclass);


--
-- TOC entry 3528 (class 2604 OID 27769)
-- Name: Invoice id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoice" ALTER COLUMN id SET DEFAULT nextval('public."Invoice_id_seq"'::regclass);


--
-- TOC entry 3521 (class 2604 OID 27717)
-- Name: Medicine id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medicine" ALTER COLUMN id SET DEFAULT nextval('public."Medicine_id_seq"'::regclass);


--
-- TOC entry 3519 (class 2604 OID 27699)
-- Name: Nurse id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Nurse" ALTER COLUMN id SET DEFAULT nextval('public."Nurse_id_seq"'::regclass);


--
-- TOC entry 3516 (class 2604 OID 27680)
-- Name: Patient id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Patient" ALTER COLUMN id SET DEFAULT nextval('public."Patient_id_seq"'::regclass);


--
-- TOC entry 3524 (class 2604 OID 27736)
-- Name: Prescription id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prescription" ALTER COLUMN id SET DEFAULT nextval('public."Prescription_id_seq"'::regclass);


--
-- TOC entry 3527 (class 2604 OID 27760)
-- Name: Treatment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Treatment" ALTER COLUMN id SET DEFAULT nextval('public."Treatment_id_seq"'::regclass);


--
-- TOC entry 3526 (class 2604 OID 27751)
-- Name: TreatmentType id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TreatmentType" ALTER COLUMN id SET DEFAULT nextval('public."TreatmentType_id_seq"'::regclass);


--
-- TOC entry 3719 (class 0 OID 27668)
-- Dependencies: 216
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Account" (id, "accountName", password, role) VALUES (2, 'doctor01', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (3, 'nurse01', 'password123', 'NURSE');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (1, '1100201717830', 'password123', 'PATIENT');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (4, 'apichart.suwan', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (5, 'somchai.phongpan', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (6, 'jaruwit.srisuk', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (7, 'prinya.kesamsuk', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (8, 'nida.hanchan', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (9, 'supachai.thipphong', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (10, 'sophita.wongwanit', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (11, 'kesara.trapsomboon', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (12, 'nutchai.pongkorn', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (13, 'sutthirak.boonthan', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (14, 'naree.phumithan', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (15, 'sophon.panpitak', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (16, 'prachya.kiatkul', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (17, 'winai.sermsak', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (18, 'opas.taveesuk', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (19, 'patcharin.pongchan', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (20, 'wasana.ploychomphoo', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (21, 'ladawan.piriyawat', 'password123', 'DOCTOR');
INSERT INTO public."Account" (id, "accountName", password, role) VALUES (22, 'kanya.sirinuch', 'password123', 'DOCTOR');


--
-- TOC entry 3731 (class 0 OID 27723)
-- Dependencies: 228
-- Data for Name: Appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Appointment" (id, "appointmentDate", "appointmentStartTime", "appointmentEndTime", "createdAt", "patientId", "doctorId", symptom, "appointmentStatus") VALUES (1, '2025-03-03 00:00:00', '9:00', '10:00', '2025-03-02 08:52:55.356', 1, 1, 'ปวดหัวเข่าซ้าย ลงไปถึงข้อเท้า จากการเล่นแบดมินตัน', 'NotTreated');
INSERT INTO public."Appointment" (id, "appointmentDate", "appointmentStartTime", "appointmentEndTime", "createdAt", "patientId", "doctorId", symptom, "appointmentStatus") VALUES (2, '2025-03-04 00:00:00', '9:00', '10:00', '2025-03-02 08:54:16.758', 1, 1, 'ตรวจสอบอาการปวดเข่าจากการเล่นกีฬา', 'NotTreated');


--
-- TOC entry 3727 (class 0 OID 27705)
-- Dependencies: 224
-- Data for Name: Department; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Department" (id, name) VALUES (1, 'กระดูกและข้อ');
INSERT INTO public."Department" (id, name) VALUES (2, 'เด็ก');
INSERT INTO public."Department" (id, name) VALUES (3, 'ตา หู คอ จมูก');
INSERT INTO public."Department" (id, name) VALUES (4, 'ผิวหนัง');
INSERT INTO public."Department" (id, name) VALUES (5, 'โรคทั่วไป');
INSERT INTO public."Department" (id, name) VALUES (6, 'ผู้หญิง');


--
-- TOC entry 3723 (class 0 OID 27687)
-- Dependencies: 220
-- Data for Name: Doctor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (1, 'หมออภิชาติ', 'สุวรรณ', '0912345678', 'apichart.suwan@example.com', 'กรุงเทพมหานคร', NULL, 1, 2);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (2, 'หมอสมชาย', 'พงษ์พันธ์', '0912345679', 'somchai.phongpan@example.com', 'กรุงเทพมหานคร', NULL, 1, 21);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (3, 'หมอจารุวิทย์', 'ศรีสุข', '0912345680', 'jaruwit.srisuk@example.com', 'เชียงใหม่', NULL, 1, 4);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (4, 'หมอปริญญา', 'เกษมสุข', '0912345681', 'prinya.kesamsuk@example.com', 'นครราชสีมา', NULL, 1, 5);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (5, 'หมอนิดา', 'หาญชาญ', '0912345682', 'nida.hanchan@example.com', 'กรุงเทพมหานคร', NULL, 2, 6);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (6, 'หมอศุภชัย', 'ทิพย์พงษ์', '0912345683', 'supachai.thipphong@example.com', 'ขอนแก่น', NULL, 2, 7);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (7, 'หมอโสภิตา', 'วงศ์วานิช', '0912345684', 'sophita.wongwanit@example.com', 'เชียงราย', NULL, 2, 8);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (8, 'หมอเกศรา', 'ทรัพย์สมบูรณ์', '0912345685', 'kesara.trapsomboon@example.com', 'กรุงเทพมหานคร', NULL, 3, 9);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (9, 'หมอณัฐชัย', 'พงศ์กร', '0912345686', 'nutchai.pongkorn@example.com', 'สงขลา', NULL, 3, 10);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (10, 'หมอสุทธิรักษ์', 'บุญธัญ', '0912345687', 'sutthirak.boonthan@example.com', 'เชียงใหม่', NULL, 3, 11);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (11, 'หมอนารี', 'ภูมิฐาน', '0912345688', 'naree.phumithan@example.com', 'กรุงเทพมหานคร', NULL, 4, 12);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (12, 'หมอโสภณ', 'พรรณพิทักษ์', '0912345689', 'sophon.panpitak@example.com', 'ภูเก็ต', NULL, 4, 13);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (13, 'หมอปรัชญา', 'เกียรติกุล', '0912345690', 'prachya.kiatkul@example.com', 'อุดรธานี', NULL, 4, 14);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (14, 'หมอวินัย', 'เสริมศักดิ์', '0912345691', 'winai.sermsak@example.com', 'กรุงเทพมหานคร', NULL, 5, 15);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (15, 'หมอโอภาส', 'ทวีสุข', '0912345692', 'opas.taveesuk@example.com', 'นครศรีธรรมราช', NULL, 5, 16);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (16, 'หมอพัชรินทร์', 'พงษ์ชาญ', '0912345693', 'patcharin.pongchan@example.com', 'ชลบุรี', NULL, 5, 17);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (17, 'หมอวาสนา', 'พลอยชมพู', '0912345694', 'wasana.ploychomphoo@example.com', 'กรุงเทพมหานคร', NULL, 6, 18);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (18, 'หมอลดาวรรณ', 'พิริยาวัชร์', '0912345695', 'ladawan.piriyawat@example.com', 'เชียงใหม่', NULL, 6, 19);
INSERT INTO public."Doctor" (id, "firstName", "lastName", phone, email, address, description, "departmentId", "accountId") VALUES (19, 'หมอกัลยา', 'ศิรินุช', '0912345696', 'kanya.sirinuch@example.com', 'บุรีรัมย์', NULL, 6, 20);


--
-- TOC entry 3740 (class 0 OID 27766)
-- Dependencies: 237
-- Data for Name: Invoice; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3729 (class 0 OID 27714)
-- Dependencies: 226
-- Data for Name: Medicine; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (1, 'พาราเซตามอล', 'เม็ด', 50, 100, '2026-12-31 00:00:00', 'รับประทานหนึ่งเม็ดทุก 6 ชั่วโมง');
INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (2, 'ไอบูโพรเฟน', 'เม็ด', 70, 150, '2026-11-30 00:00:00', 'รับประทานหนึ่งเม็ดทุก 8 ชั่วโมง');
INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (3, 'อะเซโทมิซอฟีน', 'แคปซูล', 100, 120, '2027-05-15 00:00:00', 'รับประทานวันละ 2 เม็ดหลังอาหาร');
INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (4, 'แอมบ็อกซิซิลลิน', 'เม็ด', 150, 80, '2027-03-20 00:00:00', 'รับประทานวันละ 3 ครั้งหลังอาหาร');
INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (5, 'มอร์ฟีน', 'ฉีด', 300, 50, '2026-10-05 00:00:00', 'ให้โดยแพทย์หรือพยาบาลเท่านั้น');
INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (6, 'คลอโรฟีนิรามีน', 'เม็ด', 45, 200, '2026-09-30 00:00:00', 'รับประทานหนึ่งเม็ดก่อนนอน');
INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (7, 'คีโตโคนาโซล', 'ครีม', 180, 75, '2026-08-25 00:00:00', 'ทาบริเวณที่ผิวหนังที่ติดเชื้อ 2 ครั้งต่อวัน');
INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (8, 'เดกซ์โทรเมทอร์แฟน', 'ซีรั่ม', 90, 100, '2027-01-10 00:00:00', 'ใช้วันละ 2 ครั้งสำหรับการบรรเทาอาการไอ');
INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (9, 'วิตามินซี', 'เม็ด', 30, 250, '2026-12-01 00:00:00', 'รับประทานวันละ 1 เม็ด');
INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (10, 'ฟลูออโรควิโนโลน', 'เม็ด', 200, 50, '2027-04-10 00:00:00', 'รับประทานวันละ 1 เม็ดหลังอาหาร');
INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (11, 'เมโทโทเร็กเซต', 'ฉีด', 500, 40, '2026-07-15 00:00:00', 'ใช้ตามคำแนะนำของแพทย์เท่านั้น');
INSERT INTO public."Medicine" (id, name, type, price, "stockQuantity", "expiryDate", instruction) VALUES (12, 'แอมเฟตามีน', 'เม็ด', 1000, 30, '2026-06-20 00:00:00', 'ใช้ภายใต้การดูแลของแพทย์เท่านั้น');


--
-- TOC entry 3725 (class 0 OID 27696)
-- Dependencies: 222
-- Data for Name: Nurse; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Nurse" (id, "firstName", "lastName", phone, email, address, "accountId") VALUES (1, 'พยาบาลกัน', 'ศิริ', '0898765432', 'nurse.kan@example.com', 'กรุงเทพมหานคร', 3);


--
-- TOC entry 3721 (class 0 OID 27677)
-- Dependencies: 218
-- Data for Name: Patient; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Patient" (id, prefix, "firstName", "lastName", "personalId", gender, nationality, dob, height, weight, "bloodGroup", phone, address, allergy, "registrationDate", "accountId") VALUES (1, 'MR', 'สมชาย', 'ผุพงษ์', '1100201717830', 'MALE', 'ไทย', '1990-01-01 00:00:00', 170, 70, 'O', '0812345678', 'กรุงเทพมหานคร', 'แพ้ถั่ว', '2025-03-02 14:11:40.873', 1);


--
-- TOC entry 3733 (class 0 OID 27733)
-- Dependencies: 230
-- Data for Name: Prescription; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3734 (class 0 OID 27742)
-- Dependencies: 231
-- Data for Name: PrescriptionMedicines; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3738 (class 0 OID 27757)
-- Dependencies: 235
-- Data for Name: Treatment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3736 (class 0 OID 27748)
-- Dependencies: 233
-- Data for Name: TreatmentType; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (1, 'การปรึกษาทั่วไป', 'การตรวจสุขภาพทั่วไปกับแพทย์ทั่วไป', 500);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (2, 'การตรวจสุขภาพเด็ก', 'การตรวจสุขภาพสำหรับเด็กและวัยรุ่น', 600);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (3, 'การรักษาผิวหนัง', 'การรักษาและคำแนะนำเกี่ยวกับผิวหนัง', 700);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (4, 'การตรวจตา', 'การตรวจสุขภาพตาและความสามารถในการมองเห็น', 800);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (5, 'การผ่าตัดกระดูก', 'การรักษาอาการเจ็บปวดจากโรคกระดูก', 1500);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (6, 'การรักษาผู้หญิง', 'การตรวจสุขภาพและการรักษาเกี่ยวกับผู้หญิง', 1000);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (7, 'การรักษาผู้ป่วยโรคทั่วไป', 'การตรวจและรักษาอาการโรคทั่วไป', 400);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (8, 'การรักษาฟัน', 'การตรวจและรักษาเกี่ยวกับฟันและช่องปาก', 1200);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (9, 'การตรวจหัวใจ', 'การตรวจสุขภาพหัวใจและหลอดเลือด', 1000);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (10, 'การบำบัดโรคจิต', 'การบำบัดและรักษาโรคทางจิตเวช', 1500);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (11, 'การผ่าตัดตา', 'การผ่าตัดรักษาโรคตาและการมองเห็น', 2500);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (12, 'การรักษาหลอดเลือด', 'การรักษาและการตรวจเกี่ยวกับโรคหลอดเลือด', 2000);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (13, 'การรักษาทางนรีเวช', 'การตรวจสุขภาพและการรักษาเกี่ยวกับนรีเวช', 1800);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (14, 'การฟื้นฟูสมรรถภาพ', 'การฟื้นฟูร่างกายหลังการเจ็บป่วยหรือการผ่าตัด', 1300);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (15, 'การรักษามะเร็ง', 'การตรวจและรักษามะเร็งทุกชนิด', 5000);
INSERT INTO public."TreatmentType" (id, name, description, cost) VALUES (16, 'การให้คำปรึกษาด้านโภชนาการ', 'คำแนะนำเกี่ยวกับการรับประทานอาหารและโภชนาการ', 600);


--
-- TOC entry 3758 (class 0 OID 0)
-- Dependencies: 215
-- Name: Account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Account_id_seq"', 22, true);


--
-- TOC entry 3759 (class 0 OID 0)
-- Dependencies: 227
-- Name: Appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Appointment_id_seq"', 2, true);


--
-- TOC entry 3760 (class 0 OID 0)
-- Dependencies: 223
-- Name: Department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Department_id_seq"', 6, true);


--
-- TOC entry 3761 (class 0 OID 0)
-- Dependencies: 219
-- Name: Doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Doctor_id_seq"', 19, true);


--
-- TOC entry 3762 (class 0 OID 0)
-- Dependencies: 236
-- Name: Invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Invoice_id_seq"', 1, false);


--
-- TOC entry 3763 (class 0 OID 0)
-- Dependencies: 225
-- Name: Medicine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Medicine_id_seq"', 12, true);


--
-- TOC entry 3764 (class 0 OID 0)
-- Dependencies: 221
-- Name: Nurse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Nurse_id_seq"', 1, true);


--
-- TOC entry 3765 (class 0 OID 0)
-- Dependencies: 217
-- Name: Patient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Patient_id_seq"', 1, true);


--
-- TOC entry 3766 (class 0 OID 0)
-- Dependencies: 229
-- Name: Prescription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Prescription_id_seq"', 1, false);


--
-- TOC entry 3767 (class 0 OID 0)
-- Dependencies: 232
-- Name: TreatmentType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TreatmentType_id_seq"', 16, true);


--
-- TOC entry 3768 (class 0 OID 0)
-- Dependencies: 234
-- Name: Treatment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Treatment_id_seq"', 1, false);


--
-- TOC entry 3532 (class 2606 OID 27675)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- TOC entry 3550 (class 2606 OID 27731)
-- Name: Appointment Appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY (id);


--
-- TOC entry 3546 (class 2606 OID 27712)
-- Name: Department Department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY (id);


--
-- TOC entry 3540 (class 2606 OID 27694)
-- Name: Doctor Doctor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Doctor"
    ADD CONSTRAINT "Doctor_pkey" PRIMARY KEY (id);


--
-- TOC entry 3562 (class 2606 OID 27772)
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY (id);


--
-- TOC entry 3548 (class 2606 OID 27721)
-- Name: Medicine Medicine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medicine"
    ADD CONSTRAINT "Medicine_pkey" PRIMARY KEY (id);


--
-- TOC entry 3544 (class 2606 OID 27703)
-- Name: Nurse Nurse_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Nurse"
    ADD CONSTRAINT "Nurse_pkey" PRIMARY KEY (id);


--
-- TOC entry 3536 (class 2606 OID 27685)
-- Name: Patient Patient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Patient"
    ADD CONSTRAINT "Patient_pkey" PRIMARY KEY (id);


--
-- TOC entry 3555 (class 2606 OID 27746)
-- Name: PrescriptionMedicines PrescriptionMedicines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrescriptionMedicines"
    ADD CONSTRAINT "PrescriptionMedicines_pkey" PRIMARY KEY ("prescriptionId", "medicineId");


--
-- TOC entry 3553 (class 2606 OID 27741)
-- Name: Prescription Prescription_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prescription"
    ADD CONSTRAINT "Prescription_pkey" PRIMARY KEY (id);


--
-- TOC entry 3557 (class 2606 OID 27755)
-- Name: TreatmentType TreatmentType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TreatmentType"
    ADD CONSTRAINT "TreatmentType_pkey" PRIMARY KEY (id);


--
-- TOC entry 3559 (class 2606 OID 27764)
-- Name: Treatment Treatment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Treatment"
    ADD CONSTRAINT "Treatment_pkey" PRIMARY KEY (id);


--
-- TOC entry 3530 (class 1259 OID 27773)
-- Name: Account_accountName_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Account_accountName_key" ON public."Account" USING btree ("accountName");


--
-- TOC entry 3537 (class 1259 OID 27777)
-- Name: Doctor_accountId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Doctor_accountId_key" ON public."Doctor" USING btree ("accountId");


--
-- TOC entry 3538 (class 1259 OID 27776)
-- Name: Doctor_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Doctor_email_key" ON public."Doctor" USING btree (email);


--
-- TOC entry 3560 (class 1259 OID 27781)
-- Name: Invoice_appointmentId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Invoice_appointmentId_key" ON public."Invoice" USING btree ("appointmentId");


--
-- TOC entry 3541 (class 1259 OID 27779)
-- Name: Nurse_accountId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Nurse_accountId_key" ON public."Nurse" USING btree ("accountId");


--
-- TOC entry 3542 (class 1259 OID 27778)
-- Name: Nurse_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Nurse_email_key" ON public."Nurse" USING btree (email);


--
-- TOC entry 3533 (class 1259 OID 27775)
-- Name: Patient_accountId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Patient_accountId_key" ON public."Patient" USING btree ("accountId");


--
-- TOC entry 3534 (class 1259 OID 27774)
-- Name: Patient_personalId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Patient_personalId_key" ON public."Patient" USING btree ("personalId");


--
-- TOC entry 3551 (class 1259 OID 27780)
-- Name: Prescription_appointmentId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Prescription_appointmentId_key" ON public."Prescription" USING btree ("appointmentId");


--
-- TOC entry 3567 (class 2606 OID 27802)
-- Name: Appointment Appointment_doctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES public."Doctor"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3568 (class 2606 OID 27807)
-- Name: Appointment Appointment_patientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES public."Patient"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3564 (class 2606 OID 27787)
-- Name: Doctor Doctor_accountId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Doctor"
    ADD CONSTRAINT "Doctor_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES public."Account"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3565 (class 2606 OID 27792)
-- Name: Doctor Doctor_departmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Doctor"
    ADD CONSTRAINT "Doctor_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES public."Department"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3574 (class 2606 OID 27837)
-- Name: Invoice Invoice_appointmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES public."Appointment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3566 (class 2606 OID 27797)
-- Name: Nurse Nurse_accountId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Nurse"
    ADD CONSTRAINT "Nurse_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES public."Account"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3563 (class 2606 OID 27782)
-- Name: Patient Patient_accountId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Patient"
    ADD CONSTRAINT "Patient_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES public."Account"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3570 (class 2606 OID 27822)
-- Name: PrescriptionMedicines PrescriptionMedicines_medicineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrescriptionMedicines"
    ADD CONSTRAINT "PrescriptionMedicines_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES public."Medicine"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3571 (class 2606 OID 27817)
-- Name: PrescriptionMedicines PrescriptionMedicines_prescriptionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrescriptionMedicines"
    ADD CONSTRAINT "PrescriptionMedicines_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES public."Prescription"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3569 (class 2606 OID 27812)
-- Name: Prescription Prescription_appointmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prescription"
    ADD CONSTRAINT "Prescription_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES public."Appointment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3572 (class 2606 OID 27827)
-- Name: Treatment Treatment_appointmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Treatment"
    ADD CONSTRAINT "Treatment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES public."Appointment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3573 (class 2606 OID 27832)
-- Name: Treatment Treatment_treatmentTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Treatment"
    ADD CONSTRAINT "Treatment_treatmentTypeId_fkey" FOREIGN KEY ("treatmentTypeId") REFERENCES public."TreatmentType"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3746 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-03-02 15:57:32 +07

--
-- PostgreSQL database dump complete
--

