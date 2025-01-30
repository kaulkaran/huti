import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Music4,
  Quote,
  ArrowRight,
  Star,
  Play,
  Pause,
} from "lucide-react";

interface Song {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  lyrics: string;
  comment: string;
}

interface AudioPlayerProps {
  audioUrl: string;
}

function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setError(null);
            })
            .catch(() => {
              setError("Unable to play audio. Please try again later.");
              setIsPlaying(false);
            });
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
      audioRef.current.addEventListener("error", () => {
        setError("Error loading audio. Please check the file.");
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, []);

  if (!audioUrl) return <p className="text-red-400">No audio file provided.</p>;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
          <div className="flex-1">
            <div
              className="h-2 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleProgressClick}
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-pink-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}

const songs: Song[] = [
  {
    
    id: 1,
    title: "Sajni",
    artist: "Jal",
    imageUrl: "https://images.unsplash.com/photo-1546471180-335a013cb87b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737713148/Sajni_-_Official_Video_Song_Boondh_A_Drop_of_Jal_Jal_-_The_Band_nwqpqj.mp3",
    lyrics: "Sajni paas bulao na...",
    comment: `Because if someone is comfortable to lie once,
    They won't hesitate to do it twice`
  },
  {
    
    id: 2,
    title: "Vo bola sun meri radha",
    artist: "Radha",
    imageUrl: "https://plus.unsplash.com/premium_photo-1676111266437-027b26837de3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1738232094/mere_dil_me_bus_gaye_shayam_japu_mai_mala_re_yuzmmb.mp3",
    lyrics: "Wo natkhat Nand kishora.......",
    comment: `Can't get over of this song ever`
  },
  {
    id: 3,
    title: "Har Ek Pal",
    artist: "Ashu Shukla",
    imageUrl: "https://images.unsplash.com/photo-1602619074972-d3525c7aa1d9?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642919/Har_Ek_Pal_-_Ashu_Shukla_Pehchan_Music_Latest_Hindi_Songs_2020_ynekvs.mp3",
    lyrics: `Hain bahut si baatein kehne ko, Dil ye hausla juta raha, Suni-suni si baatein lagti hain. Par ye mere dil ka haal hai`,
    comment: `Bindu, suna hai aashiq uska
shayar nahi hai.....❤️,
Ab isse jyada husn ki
badnaami kya hogi`
    },
    {
    id: 4,
    title: "Judai",
    artist: "Pritam",
    imageUrl: "https://images.unsplash.com/photo-1632150050176-90c896622560?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642918/Judai_Best_Video_-_JannatEmraan_HashmiSonal_ChauhanKamran_AhmedPritam_sumisx.mp3",
    lyrics: `Tere bin dil mera laage kahin na
    Tere bin jaan meri jaaye kahin na
    Kitne zamane baad, oh, Rabba
    Yaad tu aaya, yaad tu aaya`,
    comment: `Vo....vo ek noor hai jo mahaz chahne se nahi milti,
Ek kali hai jo baharon mein nahi khilti 🌸`
    },
  {
    id: 5,
  title: "Tune Mere Jana",
    artist: "Gajendra Verma",
    imageUrl: "https://images.unsplash.com/photo-1642511283397-e0bc9d502762?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642921/Gajendra_Verma_-_Tune_Mere_Jaana_Kabhi_Nahi_Jaana_I_Emptiness_Gajendra_Verma_Songs_Sonotek_Music_e1tpsh.mp3",
    lyrics: `Tune mere jaana, Kabhi nahi jaana`,
    comment: `Khubsurati lafz ka izaad tujhse hai,
Meri har nazm ka panna abaad tujhse hai...`
    },
   {
    id: 6,
    title: "Kiven Mukhde",
    artist: "Madhur Sharma",
    imageUrl: "https://images.unsplash.com/photo-1663331010792-071c2a0caeb8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642925/Tere_Jeya_Hor_Disda_-_Madhur_Sharma_Kiven_Mukhde_PearlRecords_Nusrat_Sahab_uk7wba.mp3",
    lyrics: `Teri nazron se pi hai khuda ki qasam,
    Umr saari nashay main guzar jaye gi`,
    comment: `Vo ishq hai, gazal hai jise har koi nahi gaa skta,
    Hazaro sajdon ke baad bhi koi nahi paa sakta`
    },
  {
    id: 7,
    title: "Tu Itni Khoobsurat Hai",
    artist: "Rahat Fateh Ali Khan",
    imageUrl: "https://images.unsplash.com/photo-1724829825151-9e85eeb3fa80?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642924/Tu_Itni_Khoobsurat_Hai_Full_Video_Barkhaa_Rahat_Fateh_Ali_Khan_Sara_Lorren_Amjad_Nadeem_ahxpid.mp3",
    lyrics: `Tu hi shaamil raha duaa mein meri,
    Naam tera rahaa zubaan pe meri`,
    comment: `Mai taiyyar kar lunga makaan apne dam par,
      Tum use aakar ghar kar dena`
    },
    {
    id: 8,
    title: "Raani",
    artist: "Karan Sehmbi",
    imageUrl: "https://images.unsplash.com/photo-1681629996793-28047b0cfca4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642928/Karan_Sehmbi__Raani_Official_Video_Rox_A_Ricky_Tru_Makers_Latest_Punjabi_Songs_2018_wtgyxt.mp3",
    lyrics: `Akhiyaan nu har pal chain ae,
    Tainu vekh vekh rajjde na nain ae`,
    comment: `Bas iss ummid me bina ruke chale jaa raha hu,
Ki aage khada hai koi baaho me araam karane ko 🌹`
    },
    {
    id: 9,
    title: "Jeen Di Gal",
    artist: "Prabh Gill",
    imageUrl: "https://images.unsplash.com/photo-1695636696592-0f6a2935d5ee?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642923/Prabh_Gill_-_Jeen_Di_Gal_Feat_Raxstar_Latest_Punjabi_Songs_b9pfv1.mp3",
    lyrics: `Mainu neend na aave raatan nu,
    Mainu chain na aave raatan nu.`,
    comment: `Ek arse se sukha pada hai, wo ek din mausam-e-kahar layegi,
      Uss din har baarish ki bund ko gale laga nachunga, 
  Wo ladki jis din mere seher aayegi`
    },
    {
    id: 10,
    title: "Desire",
    artist: "Prabh Gill",
    imageUrl: "https://images.unsplash.com/photo-1695636877871-2484c46e6452?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642923/Desire_Prabh_Gill_Ft._Raashi_Sood_Ar_Deep_Latest_Punjabi_Songs_New_Punjabi_Songs_tdprtr.mp3",
    lyrics: "Wah Khudaya Kya Nazare, Tainu Takiye Je Khalo’ke,",
    comment: "Bindu, if our story had a soundtrack, this would be one of the highlights. 🎶"
    },
    {
    id: 11,
    title: "Laal Ishq",
    artist: "Rahat Fateh Ali Khan",
    imageUrl: "https://images.unsplash.com/photo-1616597053809-fad010d870c1?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737642925/Laal_Ishq_-_A_sequel_of_Landa_Bazar_OST_by_Rahat_Fateh_Ali_Khan_CU2_xdfb0d.mp3",
    lyrics: `Ek Mohabbat Se Yeh,
    Na Sambhaale Gaye`,
    comment: "Every beat of this song resonates with the way my heart skips for you."
    },
    {
    id: 12,
    title: "Akhiyan",
    artist: "Rahat Fateh Ali Khan",
    imageUrl: "https://images.unsplash.com/photo-1627731306172-b8ae5fe92320?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737643408/Akhiyan_Full_Audio_Song_Rahat_Fateh_Ali_Khan_Punjabi_Song_Collection_Speed_Records_wqnmj7.mp3",
    lyrics: `Tainu takkeya te dull gayian akhiyan akhiyan,
    Saari duniya nu bhull gayian akhiyan akhiyan`,
  comment: "This song paints a picture of love, but you make it come alive for me."
    },
    {
    id: 13,
    title: "Chaahat",
    artist: "Rahat Fateh Ali Khan",
    imageUrl: "https://images.unsplash.com/photo-1626358134206-0d1b77d48f21?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737643425/Chaahat_-_Official_4K_Version_Rahat_Fateh_Ali_Khan_Blood_Money_Kunal_Khemu_Jeet_Gannguli_u9kavn.mp3",
    lyrics: `Main toh bas teri chahat mein,
    Chahoon rehna sada`,
    comment: "Bindu, every time I hear this, I can’t help but think of us dancing under the stars."
    },
  {
    id: 14,
    title: "Aankhon Se Batana",
    artist: "Dikshant",
    imageUrl: "https://images.unsplash.com/photo-1691697590646-c9b7bf6bef85?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737643408/Aankhon_Se_Batana_Dikshant_Viral_Song_2022_Official_Video_muehkq.mp3",
    lyrics: "Tum Aankhon Se Batana, Hum samjh jayenge",
    comment: "Hearing this makes me want to relive every magical moment I’ve shared with you."
    },
    {
    id: 15,
    title: "Aaju Mithila Nagariya Nihal Sakhiya",
    artist: "Priya Mallick",
    imageUrl: "https://images.unsplash.com/photo-1663331010792-071c2a0caeb8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737643410/Priya_Mallick_Aaju_Mithila_Nagariya_l_%E0%A4%86%E0%A4%9C_%E0%A4%AE%E0%A4%A5%E0%A4%B2_%E0%A4%A8%E0%A4%97%E0%A4%B0%E0%A4%AF_Maithili_folkl_Snehlata_Pankaj_Apoorva_sehzjk.mp3",
    lyrics: "Aaju Mithila Nagariya Nihal Sakhiya....",
    comment: "A traditional tune with cultural richness."
    },
    {
    id: 16,
    title: "Kitni Haseen Hogi",
    artist: "Mithoon, Arijit Singh, Sayeed Quadri",
    imageUrl: "https://images.unsplash.com/photo-1654502579099-ba14d34827c0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737643408/Kitni_Haseen_Hogi_-_HIT__The_First_Case_Rajkummar_Sanya_Mithoon_Arijit_S_Sayeed_Q_Bhushan_K_blzzbv.mp3",
    lyrics : "Kitni haseen hogi woh mulaqatein...",
    comment: `Mera dil tumne bhi rakha tha kabhi, ye sochkar,
Tumhare jane ke baad apne dil par bhi inaam rakhunga,
Likhunga ek kitaab aur jaan"
Tumhare naam par uss kitaab ka naam rakhunga`
    },
    {
    id: 17,
    title: "Benaqab",
    artist: "Lakhwinder Wadali, Sufiyan Bhatt",
    imageUrl: "https://images.unsplash.com/photo-1664360155784-ab1074aa0be8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737713163/Benaqab_-_Lakhwinder_Wadali_Rehmat_Rattan_Sufiyan_Bhatt_M.S._Abid_Zee_Music_Originals_zdwqpa.mp3",
    lyrics: "Benaqab si hai, zindagi meri...",
    comment: "This melody reminds me of how your presence turns my world into a masterpiece."
    },
    {
    id: 18,
    title: "Judaa",
    artist: "Amrinder Gill",
    imageUrl: "https://images.unsplash.com/photo-1665135194772-0329053ae5d3?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737713156/Tu_Judaa_Amrinder_Gill_-_Judda_Full_Song_YouTube.flv_SaveYouTube.com_.flv_nwcm0u.mp3",
    lyrics: "Dil judaa hoke bhi tera hi hai...",
    comment: `Mere aane par likha tha tumne apne jaane par likhna,
Kaise tumhare bulane par mere chale aane par likhna`
    },
    {
id: 19,
title: "Pagal",
artist: "Gurnam Bhullar",
imageUrl: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737713130/Pagal_Official_Music_Video_Gurnam_Bhullar_G_Guri_Baljit_Singh_Deo_Songs_2019_s9kkuq.mp3",
lyrics: "Pagal sa dil mera tera deewana...",
comment: "If music is what feelings sound like, this song is the sound of you in my heart."
    },
    
    {
    id: 20,
    title: "Shairana Si Hai Zindagi",
    artist: "Alka Yagnik",
    imageUrl: "https://images.unsplash.com/photo-1592355591829-aaae33fcff1d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737713181/Shairana_Si_Hai_Zindagi_Ki_Faza_-_Lyrical_Phir_Teri_Kahani_Yaad_Ayee_Alka_Yagnik_90s_Hindi_Hits_nh17zf.mp3",
    lyrics: "Shairana si hai zindagi ke rang...",
    comment: `Tum mujhe 'Vaqt' samjh kar kaat lena,
Mai tumhe 'Jindagi' samjh ke jee lunga...`
    },
    {
    id: 21,
    title: "Lakh Pardo Mein",
    artist: "Said Sabri, Farid Sabri",
    imageUrl: "https://plus.unsplash.com/premium_photo-1720694818685-60a176ddfedf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737713144/Official_Song___Lakh_Pardo_Mein_%E0%A4%B2%E0%A4%96_%E0%A4%AA%E0%A4%B0%E0%A4%A6_%E0%A4%AE_Said_Sabri_Farid_Sabri_T-Series_Islamic_Music_pwnsin.mp3",
    lyrics: "Lakh pardo mein chupao...",
    comment: "A soulful qawwali that touches the soul."
    },
    {
id: 22,
title: "Dua Kijiye",
artist: "Rashid Khan, Raj Barman",
imageUrl: "https://images.unsplash.com/photo-1569154107747-fb00e3b3430d?q=80&w=1349&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737713100/Dua_Kijiye_Amyra_Dastur_Parth_Samthaan_Raj_Barman_Rashid_Khan_A_M_Turaz_Zee_Music_Originals_ap7ce8.mp3",
lyrics: "Dua kijiye ke ye dil sambhale...",
comment: "A moving song filled with emotional depth."
    },
    {
    id: 23,
    title: "Ikko - Mikke",
    artist: "Satinder Sartaaj",
    imageUrl: "https://images.unsplash.com/photo-1498736297812-3a08021f206f?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737713110/Ikko_Mikke_-_Sanu_ajkal_sheesha_bada_ched_da_Satinder_Sartaaj_New_Punjabi_Song_2020_New_Song_ccq5hf.mp3",
    lyrics: "Ikko mikke, saath chalein hum...",
    comment: "Bindu, this reminds me of all the little moments we’ve shared that make life so beautiful."
    },
    {
    id: 24,
    title: "Purani Tape",
    artist: "Simiran Kaur Dhadli, Zakir",
    imageUrl: "https://images.unsplash.com/photo-1574087776137-305a55298646?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1737713151/Purani_Tape_Mixtape_Simiran_Kaur_Dhadli_Zakir_ykg7ys.mp3",
    lyrics: "Purani tape sunta hoon ab bhi...",
    comment: "Nostalgic vibes that take you back in time."
    },
  {
    id: 25,
    title: "Tu Banja Gali Benaras Ki",
    artist: "Asees Kaur",
    imageUrl: "https://images.unsplash.com/photo-1622810820824-f233f3f2c9fe?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "https://res.cloudinary.com/dw5ow19cc/video/upload/v1738230533/audio/hrxyfyrq8atwjayvluhp.mp3",
    lyrics: `Tu banja gali banaras ki,
Main shaam talak bhatku tujhme`,
    comment: `Ek kashi ka ghat mile chahe sir pe na koi chhat ho,
Gar sunu to tera naame aaye jo padhu to tera wo khat ho....`
    }
  // Additional songs can be added here
];

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          <Star className="w-2 h-2 text-purple-200" />
        </div>
      ))}
    </div>
  );
}

function Footer({ visitCount }: { visitCount: number }) {
  return (
    <footer className="bg-white/10 backdrop-blur-lg text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-purple-200 text-sm">
          Created with ❤️ by <span className="text-pink-300 font-semibold">Saksham</span>
        </p>
        <p className="text-purple-200 text-sm mt-1">
          Dedicated to the love of <span className="text-pink-300 font-semibold">Bindu</span>
        </p>
         <p className="text-purple-200 text-sm mt-4">
          You have visited this website <span className="text-pink-300 font-semibold">{visitCount}</span> times.
        </p>
        <p className="text-purple-200 text-xs mt-4">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}



function App() {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Get the visit count from localStorage
    const storedCount = localStorage.getItem("visitCount");
    const currentCount = storedCount ? parseInt(storedCount, 10) : 0;

    // Increment the count and update localStorage
    const newCount = currentCount + 1;
    localStorage.setItem("visitCount", newCount.toString());

    // Update state
    setVisitCount(newCount);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500 flex items-center justify-center">
        <Heart className="w-16 h-16 text-white animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500 relative">
      <StarField />

      {!showPlaylist ? (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <div className="space-y-8">
            <h1 className="text-6xl font-bold text-white mb-4">
              Welcome to Our Playlist
              <span className="block text-pink-300 mt-2">Bindu ❤️</span>
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              A collection of songs that tell our story, capture our moments,
              and express my love for you.
            </p>
            <button
              onClick={() => setShowPlaylist(true)}
              className="group bg-white text-purple-700 px-8 py-4 rounded-full text-xl font-semibold 
                       hover:bg-purple-100 transition-all duration-300 transform hover:scale-105
                       flex items-center space-x-2 mx-auto"
            >
              <span>Dive Into Our Playlist</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={() => setShowPlaylist(false)}
            className="text-white mb-8 hover:text-pink-200 transition-colors flex items-center space-x-2"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span>Back to Home</span>
          </button>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {songs.map((song) => (
              <div
                key={song.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white shadow-xl
                         hover:transform hover:scale-[1.02] transition-all duration-300 flex flex-col space-y-4"
              >
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src={song.imageUrl}
                    alt={`${song.title} by ${song.artist}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold flex items-center">
                    <Music4 className="w-6 h-6 mr-2 text-pink-300" />
                    {song.title}
                  </h3>
                  <p className="text-purple-200">{song.artist}</p>
                </div>
                <AudioPlayer audioUrl={song.audioUrl} />
                <div>
                  <div className="flex items-center mb-2">
                    <Quote className="text-pink-300 w-5 h-5 mr-2" />
                    <h4 className="text-xl font-medium">Lyrics</h4>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 h-48 overflow-y-auto">
                    <p className="whitespace-pre-line text-purple-100">
                      {song.lyrics}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Heart className="text-pink-300 w-5 h-5 mr-2" />
                    <h4 className="text-xl font-medium">Why This Song Is Special</h4>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 max-h-35 overflow-y-auto">
                    <p className="text-purple-100 whitespace-pre-line">{song.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer visitCount={visitCount} />
    </div>
  );
}

export default App;
