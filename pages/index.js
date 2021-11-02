import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import size from 'lodash/size'

export default function Home() {
  const questions = {
    1:{id: 1, text: "Saya suka bekerja dibalik layar, mengerjakan detail-detail kecil."},
    2:{id: 2, text: "Saya biasanya mengambil peran pemimpin ketika tidak ada pemimpin dalam sebuah grup / kelompok."},
    3:{id: 3, text: "Ketika dalam kelompok, saya cenderung memperhatikan dan mendekati yang menyendiri, untuk membantu mereka merasa bagian dari kelompok."},
    4:{id: 4, text: "Saya memiliki kemampuan untuk mengenali kebutuhan dan menyelesaikannya, tidak peduli seberapa kecilnya."},
    5:{id: 5, text: "Saya memiliki kemampuan untuk mengatur ide-ide, orang dan proyek untuk mencapai tujuan tertentu."},
    6:{id: 6, text: "Orang sering mengatakan saya memiliki penilaian spiritual yang baik."},
    7:{id: 7, text: "Saya sangat yakin dapat mencapai hal-hal besar untuk kemuliaan Tuhan."},
    8:{id: 8, text: "Saya diminta untuk menyanyi atau memainkan alat musik di acara gereja."},
    9:{id: 9, text: "Tuhan telah menggunakan saya untuk menyampaikan Injil dalam bahasa yang tidak saya kenal."},
    10:{id: 10, text: "Melalui doaku, Tuhan telah membuat yang tidak mungkin menjadi mungkin."},
    11:{id: 11, text: "Saya memiliki kemampuan untuk menggunakan tangan saya dengan cara yang kreatif untuk merancang dan membangun sesuatu."},
    12:{id: 12, text: "Saya telah melihat doa saya menyembuhkan orang."},
    13:{id: 13, text: "Saya senang memberikan uang kepada mereka yang membutuhkan secara finansial."},
    14:{id: 14, text: "Saya senang melayani orang-orang di rumah sakit, penjara, atau rumah peristirahatan untuk menghibur mereka."},
    15:{id: 15, text: "Saya sering memiliki wawasan yang menawarkan solusi praktis untuk masalah yang sulit."},
    16:{id: 16, text: "Saya sering memahami masalah di gereja dan telah mendapat jawabannya ketika yang lain tidak."},
    17:{id: 17, text: "Saya senang mendorong dan memberikan nasihat kepada mereka yang putus asa."},
    18:{id: 18, text: "Saya memiliki kemampuan untuk mempelajari Firman Tuhan secara menyeluruh dan membagikannya kepada yang lain."},
    19:{id: 19, text: "Saat ini saya memiliki tanggung jawab untuk pertumbuhan spiritual satu atau lebih orang percaya."},
    20:{id: 20, text: "Orang lain menghormati saya sebagai otoritas dalam hal spiritual."},
    21:{id: 21, text: "Saya memiliki kemampuan untuk belajar bahasa asing."},
    22:{id: 22, text: "Tuhan sering mengungkapkan kepada saya arah yang Dia inginkan dari tubuh Kristus untuk bergerak."},
    23:{id: 23, text: "Saya menikmati mengembangkan hubungan dengan Non-Kristen, terutama dengan harapan untuk memberi tahu mereka tentang Yesus."},
    24:{id: 24, text: "Setiap kali saya mendengar laporan di berita atau dalam percakapan tentang situasi yang membutuhkan, saya terbebani untuk berdoa."},
    25:{id: 25, text: "Saya ingin membantu pendeta atau pemimpin lain agar mereka memiliki lebih banyak waktu untuk mencapai pelayanan mereka."},
    26:{id: 26, text: "Ketika saya meminta orang untuk membantu saya menyelesaikan pelayanan penting bagi gereja, mereka biasanya mengatakan, 'Ya.'"},
    27:{id: 27, text: "Saya senang menjamu tamu dan membuat mereka merasa 'di rumah' ketika mereka berkunjung."},
    28:{id: 28, text: "Saya berinisiatif untuk melayani dan senang melayani orang lain, sekecil apapun tugasnya."},
    29:{id: 29, text: "Saya adalah orang yang sangat terorganisir yang menetapkan tujuan, membuat rencana, dan mencapai tujuan."},
    30:{id: 30, text: "Saya seorang penilai karakter yang baik dan dapat melihat kepalsuan spiritual."},
    31:{id: 31, text: "Saya sering melangkah keluar dan memulai proyek yang orang lain tidak akan coba, dan proyek itu biasanya sukses."},
    32:{id: 32, text: "Saya yakin saya bisa membuat perbedaan positif dalam tim musik atau penyembahan."},
    33:{id: 33, text: "Berdoa dalam bahasa roh secara pribadi berarti bagi saya dalam kehidupan doa saya."},
    34:{id: 34, text: "Tuhan telah menggunakan saya untuk membuat hal-hal terjadi yang jauh di luar kemampuan manusia."},
    35:{id: 35, text: "Saya senang melakukan hal-hal seperti pengerjaan kayu, merajut, menjahit, pengerjaan logam, pewarnaan kaca, dll."},
    36:{id: 36, text: "Saya sering berdoa bagi mereka yang sakit fisik dan emosional, agar Tuhan menyembuhkan mereka."},
    37:{id: 37, text: "Saya dengan sukacita memberikan uang kepada gereja jauh di atas persepuluhan saya."},
    38:{id: 38, text: "Saya merasa kasihan pada orang-orang yang terluka dan kesepian dan suka menghabiskan banyak waktu dengan mereka untuk menghibur mereka."},
    39:{id: 39, text: "Tuhan telah memampukan saya untuk memilih dengan benar di antara beberapa pilihan yang rumit dalam sebuah keputusan penting, ketika tidak ada orang lain yang tahu apa yang harus dilakukan."},
    40:{id: 40, text: "Saya senang mempelajari pertanyaan-pertanyaan sulit tentang Firman Tuhan, dan saya dapat menemukan jawabannya lebih mudah dan lebih cepat daripada yang lain."},
    41:{id: 41, text: "Saya sangat puas ketika saya mendorong orang lain, terutama jika itu tentang pertumbuhan spiritual mereka."},
    42:{id: 42, text: "Ketika sebuah pertanyaan muncul dari bagian Alkitab yang sulit, saya termotivasi untuk meneliti jawabannya."},
    43:{id: 43, text: "Saya senang terlibat dalam kehidupan orang dan membantu mereka tumbuh secara rohani."},
    44:{id: 44, text: "Saya akan bersedia dan bersemangat untuk memulai sebuah gereja baru."},
    45:{id: 45, text: "Saya dapat dengan mudah beradaptasi dengan budaya, bahasa, dan gaya hidup dan ingin menggunakan kemampuan beradaptasi untuk melayani di luar negeri."},
    46:{id: 46, text: "​​Saya akan selalu berbicara untuk prinsip-prinsip Kristen dengan keyakinan, bahkan ketika apa yang saya katakan tidak populer."},
    47:{id: 47, text: "Saya merasa mudah untuk mengundang orang untuk menerima Yesus sebagai Juruselamat mereka."},
    48:{id: 48, text: "Saya memiliki hasrat untuk berdoa untuk masalah penting kerajaan Tuhan dan kehendak-Nya untuk ke-Kristen-an."},
    49:{id: 49, text: "Saya senang membebaskan orang lain dari tugas-tugas rutin sehingga mereka dapat menyelesaikan proyek-proyek penting."},
    50:{id: 50, text: "Saya dapat membimbing dan memotivasi sekelompok orang untuk mencapai tujuan tertentu."},
    51:{id: 51, text: "Saya senang bertemu orang baru dan memperkenalkan mereka kepada orang lain dalam kelompok."},
    52:{id: 52, text: "Saya sangat dapat diandalkan untuk menyelesaikan sesuatu tepat waktu, dan saya tidak membutuhkan banyak pujian atau terima kasih."},
    53:{id: 53, text: "Saya dengan mudah mendelegasikan tanggung jawab yang signifikan kepada orang lain."},
    54:{id: 54, text: "Saya mampu membedakan antara benar dan salah dalam hal-hal rohani yang kompleks yang orang lain sepertinya tidak tahu."},
    55:{id: 55, text: "Saya percaya pada kesetiaan Tuhan untuk masa depan yang cerah, bahkan ketika menghadapi masalah yang signifikan."},
    56:{id: 56, text: "Saya suka menyanyi, dan orang-orang mengatakan saya memiliki suara yang bagus."},
    57:{id: 57, text: "Saya telah dipimpin oleh Roh Kudus selama doa atau penyembahan dan telah mulai berbicara dalam bahasa roh dan/atau menafsirkan bahasa roh."},
    58:{id: 58, text: "Tuhan telah memberkati doa-doa saya sehingga hasil supernatural datang dari situasi yang tidak mungkin."},
    59:{id: 59, text: "Saya menemukan kepuasan dalam memenuhi kebutuhan orang dengan membuat sesuatu untuk mereka."},
    60:{id: 60, text: "Tuhan secara teratur berbicara kepada saya tentang penyakit orang sehingga saya dapat berdoa untuk mereka."},
    61:{id: 61, text: "Saya tidak keberatan menurunkan standar hidup saya untuk memberi lebih banyak kepada gereja dan orang lain yang membutuhkan."},
    62:{id: 62, text: "Saya ingin melakukan apapun yang saya bisa untuk orang-orang yang membutuhkan di sekitar saya, bahkan jika saya harus mengorbankan sesuatu."},
    63:{id: 63, text: "Orang sering meminta nasihat saya ketika mereka tidak tahu apa yang harus dilakukan dalam suatu situasi."},
    64:{id: 64, text: "Saya memiliki kemampuan untuk mengumpulkan informasi dari beberapa sumber untuk menemukan jawaban atas pertanyaan atau untuk mempelajari lebih lanjut tentang suatu subjek."},
    65:{id: 65, text: "Saya merasa perlu untuk menantang orang lain untuk memperbaiki diri mereka sendiri, terutama dalam pertumbuhan rohani mereka, dengan cara yang meneguhkan, bukan mencela."},
    66:{id: 66, text: "Orang lain mendengarkan dan menikmati pengajaran tulisan suci saya."},
    67:{id: 67, text: "Saya peduli dengan kesejahteraan spiritual orang dan melakukan yang terbaik untuk membimbing mereka menuju gaya hidup yang saleh."},
    68:{id: 68, text: "Saya diterima sebagai otoritas spiritual di bagian lain negara atau dunia."},
    69:{id: 69, text: "Saya ingin menyampaikan Injil dalam bahasa asing, di negara yang budaya dan gaya hidupnya berbeda dari saya sendiri."},
    70:{id: 70, text: "Saya merasa perlu untuk menyampaikan pesan Tuhan dari Alkitab agar orang tahu apa yang Tuhan harapkan dari mereka."},
    71:{id: 71, text: "Saya ingin memberitahu orang lain bagaimana menjadi seorang Kristen dan menawarkan mereka undangan untuk menerima Yesus ke dalam hidup mereka."},
    72:{id: 72, text: "Banyak doa saya untuk orang lain telah dijawab oleh Tuhan."},
    73:{id: 73, text: "Saya senang membantu orang lain menyelesaikan pekerjaan mereka dan tidak membutuhkan banyak pengakuan publik."},
    74:{id: 74, text: "Orang-orang menghormati pendapat saya dan mengikuti arahan saya."},
    75:{id: 75, text: "Saya ingin menggunakan rumah saya untuk berkenalan dengan pendatang baru dan pengunjung gereja"},
    76:{id: 76, text: "Saya senang membantu orang dalam segala jenis kebutuhan dan merasakan kepuasan dalam memenuhi kebutuhan itu."},
    77:{id: 77, text: "Saya merasa nyaman membuat keputusan penting, bahkan di bawah tekanan."},
    78:{id: 78, text: "Orang-orang datang kepada saya untuk meminta bantuan dalam membedakan antara kebenaran spiritual dan kesalahan."},
    79:{id: 79, text: "Saya sering melatih iman saya melalui doa, dan Tuhan menjawab doa saya dengan cara yang penuh kuasa."},
    80:{id: 80, text: "Saya percaya Tuhan dapat menggunakan saya dalam paduan suara untuk menyampaikan pesan melalui lagu."},
    81:{id: 81, text: "Saya telah berbicara dalam bahasa yang tidak saya ketahui yang, ketika ditafsirkan, membawa berkat bagi mereka yang mendengarnya."},
    82:{id: 82, text: "Tuhan menggunakan saya untuk melakukan mukjizat untuk kemuliaan kerajaan-Nya."},
    83:{id: 83, text: "Orang bilang saya berbakat dengan tangan saya."},
    84:{id: 84, text: "Orang sering mencari saya untuk berdoa bagi kesembuhan fisik mereka."},
    85:{id: 85, text: "Ketika saya memberikan uang kepada seseorang, saya tidak mengharapkan imbalan apa pun dan sering memberi secara anonim."},
    86:{id: 86, text: "Ketika saya mendengar orang tanpa pekerjaan yang tidak dapat membayar tagihan mereka, saya melakukan apa yang saya bisa untuk membantu mereka."},
    87:{id: 87, text: "Tuhan memampukan saya untuk menerapkan kebenaran Alkitab dengan tepat dalam situasi-situasi praktis."},
    88:{id: 88, text: "Saya dapat menemukan sendiri kebenaran dan prinsip Alkitab yang sulit, dan saya menikmatinya."},
    89:{id: 89, text: "Orang-orang merasa mudah untuk berbicara dengan saya dan menanggapi dengan baik dorongan saya untuk menjadi semua yang mereka bisa bagi Tuhan."},
    90:{id: 90, text: "Saya terorganisir dalam pemikiran saya dan sistematis dalam pendekatan saya untuk menyajikan pelajaran Alkitab kepada sekelompok orang."},
    91:{id: 91, text: "Saya membantu orang-orang Kristen yang telah menyimpang jauh dari Tuhan menemukan jalan mereka kembali ke hubungan yang berkembang dengan-Nya dan terlibat dalam gereja lokal."},
    92:{id: 92, text: "Saya akan bersemangat untuk membagikan Injil dan membentuk kelompok baru orang Kristen di daerah yang tidak banyak gereja."},
    93:{id: 93, text: "Saya tidak memiliki prasangka rasial dan memiliki penghargaan yang tulus untuk orang yang sangat berbeda dari diri saya sendiri"},
    94:{id: 94, text: "Saya merasa relatif mudah untuk menerapkan janji-janji Alkitab dalam situasi masa kini, dan saya bersedia untuk menghadapinya, dalam kasih, jika perlu."},
    95:{id: 95, text: "Saya memiliki keinginan yang kuat untuk membantu Non-Kristen menemukan keselamatan melalui Yesus Kristus."},
    96:{id: 96, text: "Doa adalah pelayanan favorit saya di gereja, dan saya secara konsisten menghabiskan banyak waktu untuk itu."}
  }
  
  const options = [0,1,2,3,4]

  const kunci = [ "HELPS", "LEADERSHIP", "HOSPITALITY", "SERVICE", "ADMINISTRATION", "DISCERNMENT", "FAITH", "MUSIC", 
    "TONGUES (and INTERPRETATION)", "MIRACLES", "CRAFTSMANSHIP", "HEALING", "GIVING", "MERCY", "WISDOM", "KNOWLEDGE",
     "EXHORTATION", "TEACHING", "PASTOR/SHEPHERD", "APOSTLESHIP", "MISSIONARY", "PROPHECY", "EVANGELIST", "INTERCESSION"]

  
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState()
  const [showResult, setShowResult] = useState(false)
  const [finalResult, setFinalResult] = useState()

  useEffect(() => {
    if(size(answers)===0){
      let tempAnswers = {}
      for(let i=1; i<97; i++){
        tempAnswers[i]={value: 0}
      }
      setAnswers(tempAnswers)
    }
  }, [])
  
  const handleUpdateAnswer = (qId, opt) => {
    let tempAnswers = {...answers}
    tempAnswers[qId].value = opt
    setAnswers({...tempAnswers})
  }

  const handleCheckResult = () => {
    let counter = 0
    let tempResult = {}
    console.log("cek result answers: ", answers)
    map(answers, (a, index)=>{
      if(tempResult[counter]===undefined){
        tempResult[counter] = {
          value: 0,
          text: kunci[counter]
        }
      }
      tempResult[counter].value += a
      counter++
      if(counter===24){
        counter = 0
      }
    })
    setFinalResult(orderBy(tempResult, ['value'], ['desc']))
    setShowResult(true)
  }
  const maxResult = 0
  return (
    <div className="main-container">
      <Head>
        <title>Spiritual Gift Test</title>
      </Head>
      {showResult===false ? <>
        <h1>Spiritual Gift Test</h1>
        <p>Pilih salah satu angka yang paling sesuai dengan kondisi kita saat ini<br />
          0 : tidak pernah<br />
          1 : pernah sekali / sangat jarang<br />
          2 : kadang - kadang<br />
          3 : sering tapi tidak selalu<br />
          4 : selalu<br />
        </p>
        <ol type="1" key={answers}>
          {map(questions, (q)=>{
            return <div key={q.id} className="questions-item">
            <li>
              {q.text}<br />
              <div className="options-container">
              {size(answers)>0 && map(options, (opt)=>{
                return <div key={`${q.id}_${opt}`} 
                  onClick={handleUpdateAnswer.bind(this, q.id, opt)}
                  className={`options-item ${answers[q.id].value===opt ? "selected":""}`}>
                    {opt}
                  </div>
              })}
              </div>
            </li>
          </div>
          })}
        </ol>
        <div className="btn-submit" onClick={handleCheckResult}>Cek Hasil</div>
      </> : 
      <>
        {map(finalResult, (fr)=>{
          maxResult++
          if(maxResult<6){
            return `${fr.text} `
          }
        })}     
      </>}
    </div>
  )
}
