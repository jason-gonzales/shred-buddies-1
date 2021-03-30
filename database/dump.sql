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

DROP INDEX IF EXISTS public.uq_attendees;
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
    "eventId" integer NOT NULL
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
    "endDate" date NOT NULL
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

COPY public.attendees ("profileId", "eventId") FROM stdin;
152	187
\.


--
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.event ("eventId", description, "resortId", "profileId", "startDate", "endDate") FROM stdin;
186	mammoth trip at the end of the month. Who's with me?	1	152	2021-03-31	2021-03-31
187	Taking a break from teaching code. Who wants to go to local Mount High with?	3	153	2021-04-01	2021-04-02
188	Going to Mammoth first of April	1	151	2021-04-01	2021-04-02
189	going to Mount High tomorrow.	3	154	2021-03-18	2021-03-18
185	going to bear on the 24th because that was Kobe's number. u	2	151	2021-03-24	2021-03-24
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.profile ("profileId", name, email, skill, "imgUrl", description) FROM stdin;
151	Jason Gonzales	jasongonzo25@gmail.com	beginner	https://ca.slack-edge.com/T1EHQUJ8J-U01553CD1HS-92382557d5b7-512	I like to play basketball and shred during the months of winter
152	Dot Keenan	dot@kennan.com	expert	https://ca.slack-edge.com/T1EHQUJ8J-UT82B4U7J-93eff2729bff-512	I am an expert in web development and I also shred occasionally. 
153	Tim D	awesome@gmail.com		https://ca.slack-edge.com/T1EHQUJ8J-UH2DX47S8-500962933591-512	I an expert in web development. Specifically backend.
154	Leo DiCaprio	titanic@gmail.com	intermediate	https://hairstyles.thehairstyler.com/hairstyle_views/front_view_images/11610/original/Leonardo-DiCaprio.jpg	I actually prefer skiing but I don't mind shredding every now and then.
155	Stephen A. Smith	asenine@gmail.com	expert	https://www.golfdigest.com/content/dam/images/golfdigest/fullset/2020/08/StephenASmith_ConjugalVisit_Square.png	I have not shredded in awhile because ESPN has me working overtime all the time. I need a vacation
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

SELECT pg_catalog.setval('public."event_eventId_seq"', 191, true);


--
-- Name: profile_profileId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."profile_profileId_seq"', 155, true);


--
-- Name: resort_resortId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."resort_resortId_seq"', 3, true);


--
-- Name: uq_attendees; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_attendees ON public.attendees USING btree ("profileId", "eventId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

