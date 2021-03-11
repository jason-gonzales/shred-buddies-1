--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)

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

ALTER TABLE IF EXISTS public.resort ALTER COLUMN "resortId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.profile ALTER COLUMN "profileId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.event ALTER COLUMN "eventId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."resort_resortId_seq";
DROP TABLE IF EXISTS public.resort;
DROP SEQUENCE IF EXISTS public."profile_profileId_seq";
DROP TABLE IF EXISTS public.profile;
DROP SEQUENCE IF EXISTS public."event_eventId_seq";
DROP TABLE IF EXISTS public.event;
DROP TABLE IF EXISTS public.attendees;
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: attendees; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.attendees (
    "profileId" integer NOT NULL,
    "eventId" integer NOT NULL,
    "isCheckedIn" boolean NOT NULL
);


--
-- Name: event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event (
    "eventId" integer NOT NULL,
    description text NOT NULL,
    "resortId" integer NOT NULL,
    "profileId" integer NOT NULL,
    "startDate" date NOT NULL,
    "endDate" date NOT NULL,
    attendees jsonb
);


--
-- Name: event_eventId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."event_eventId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: event_eventId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."event_eventId_seq" OWNED BY public.event."eventId";


--
-- Name: profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profile (
    "profileId" integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    skill text NOT NULL,
    "imgUrl" text NOT NULL,
    description text NOT NULL
);


--
-- Name: profile_profileId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."profile_profileId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: profile_profileId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."profile_profileId_seq" OWNED BY public.profile."profileId";


--
-- Name: resort; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.resort (
    "resortId" integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    description text NOT NULL,
    "imgUrl" text NOT NULL
);


--
-- Name: resort_resortId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."resort_resortId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: resort_resortId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."resort_resortId_seq" OWNED BY public.resort."resortId";


--
-- Name: event eventId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event ALTER COLUMN "eventId" SET DEFAULT nextval('public."event_eventId_seq"'::regclass);


--
-- Name: profile profileId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile ALTER COLUMN "profileId" SET DEFAULT nextval('public."profile_profileId_seq"'::regclass);


--
-- Name: resort resortId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resort ALTER COLUMN "resortId" SET DEFAULT nextval('public."resort_resortId_seq"'::regclass);


--
-- Data for Name: attendees; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.attendees ("profileId", "eventId", "isCheckedIn") FROM stdin;
157	328	t
\.


--
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.event ("eventId", description, "resortId", "profileId", "startDate", "endDate", attendees) FROM stdin;
163	we are excited!	3	9	2020-12-29	2020-12-31	\N
164	next year will be a better year	3	6	2021-01-06	2021-01-07	\N
165	I miss shredding	1	9	2020-12-29	2021-01-01	\N
166	2020 has been a crazy year!	1	5	2020-12-29	2021-01-01	\N
167	lol	2	3	2020-12-14	2020-12-18	\N
168	what is going on	3	10	2021-01-04	2021-01-07	\N
169	lets go boarding asap pleaaaaase	1	5	2021-01-22	2021-01-23	\N
170	lets go boarding asap pleaaaaase	1	5	2021-01-22	2021-01-23	\N
171	lets go boarding asap pleaaaaase	1	5	2021-01-22	2021-01-23	[{"profileId": 145}, {"profileId": 146}]
172	test1231234	2	144	2021-03-29	2021-03-26	[{"profileId": 145}, {"profileId": 146}]
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.profile ("profileId", name, email, skill, "imgUrl", description) FROM stdin;
144	Jason Gonzales	jasongonzo25@gmail.com	intermediate	https://ca.slack-edge.com/T1EHQUJ8J-U01553CD1HS-92382557d5b7-512	I like to eat chicken mc nuggets, snowboard all day, and code all night!
145	Mark Justin Gallardo	mark@yahoo.com	expert	https://ca.slack-edge.com/T1EHQUJ8J-U016NP1639T-9d2bb904061b-512	I like to play video games all day and code all day also!
146	Dot Keenan	keebology.com	expert	https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200824175931-kobe-bryant-file.jpg	They call me Steph Curry
147	Kobe Bryant	kobee@gmail.com	expert	https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200824175931-kobe-bryant-file.jpg	I am the GOAT
148	Kobeeee	byant.com	expert	https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200824175931-kobe-bryant-file.jpg	im the goat 
149	Steph Curry	curry.com	expert	https://ca.slack-edge.com/T1EHQUJ8J-U01553CD1HS-92382557d5b7-512	I like to shot a lot of threes
150	Jason Gonzales	jasongonzo25@gmail.com	expert	https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200824175931-kobe-bryant-file.jpg	hellooo there mark
\.


--
-- Data for Name: resort; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.resort ("resortId", name, address, description, "imgUrl") FROM stdin;
2	Bear Mountain	43101 Goldmine Dr, Big Bear Lake, CA 92315	Bear Mountain, formerly Goldmine Mountain, is a ski area in Southern California, United States. When its neighbor, Snow Summit, bought Bear Mountain in 2002, the new entity, Big Bear Mountain Resorts, comprised the two, with a single lift ticket usable at both.	/images/big-bear.jpg
1	Mammoth Mountain	10001 Minaret Rd, Mammoth Lakes, CA 93546	Mammoth Mountain Ski Area is a large ski resort in the western United States, located in eastern California along the east side of the Sierra Nevada mountain range in the Inyo National Forest. Mammoth has more than 3,500 acres of ski-able terrain, serviced by 28 lift.	/images/mammoth-ski.jpg
3	Mountain High	 24510 CA-2, Wrightwood, CA 92397	Mountain High resort is a winter resort in the San Gabriel Mountains in Los Angeles County in California. Mountain High is one of the most-visited resorts in Southern California. The resort is located along State Route 2 west of Wrightwood, California.	/images/mountain-high.jpg
\.


--
-- Name: event_eventId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."event_eventId_seq"', 177, true);


--
-- Name: profile_profileId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."profile_profileId_seq"', 150, true);


--
-- Name: resort_resortId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."resort_resortId_seq"', 3, true);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

