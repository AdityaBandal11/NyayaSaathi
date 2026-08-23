// Centralized Multilingual AI Responses for NyayaSaathi AI prototype
// Supports English ('en'), Hindi ('hi'), and Marathi ('mr')

export const chatSuggestionsByLang = {
  en: [
    'What are my rights as a tenant?',
    'How can I file an RTI application?',
    'Which government schemes am I eligible for?',
    'My employer has not paid my salary.',
    'How do I complain about a defective product?',
  ],
  hi: [
    'किरायेदार के रूप में मेरे क्या अधिकार हैं?',
    'मैं आरटीआई (RTI) आवेदन कैसे दाखिल कर सकता हूं?',
    'मैं किन सरकारी योजनाओं के लिए पात्र हूं?',
    'मेरे नियोक्ता ने मेरा वेतन नहीं दिया है।',
    'उपभोक्ता शिकायत कैसे दर्ज करें?',
  ],
  mr: [
    'भाडेकरू म्हणून माझे अधिकार काय आहेत?',
    'मी RTI अर्ज कसा दाखल करू शकतो?',
    'मी कोणत्या सरकारी योजनांसाठी पात्र आहे?',
    'माझ्या मालकाने माझा पगार दिलेला नाही.',
    'ग्राहकाची तक्रार कशी नोंदवावी?',
  ]
};

export const multilingualResponses = {
  en: {
    tenant: {
      keywords: ['landlord', 'deposit', 'rent', 'tenant', 'eviction', 'rental', 'lease', 'house'],
      reply: 'I understand your concern. Under Indian tenant rights and Rent Control Acts, your landlord cannot arbitrarily withhold your security deposit or evict you without due legal notice.',
      actionPlan: [
        'Collect your written rental agreement and rent receipts.',
        'Gather proof of deposit payment (bank statements or receipts).',
        'Send a formal legal notice or written request to your landlord.',
        'Keep records of all calls, WhatsApp messages, and letters.',
        'Approach the Rent Control Court or Rent Tribunal if unresolved within 15 days.'
      ],
      documents: ['Rental Agreement', 'Security Deposit Receipt', 'Bank Payment Proof', 'Written Communications'],
      sources: [{ org: 'Ministry of Housing and Urban Affairs', dept: 'Model Tenancy Act', label: 'Official Guideline' }]
    },
    rti: {
      keywords: ['rti', 'right to information', 'information act', 'file rti', 'public authority'],
      reply: 'You have the right to request information from any public authority under the Right to Information Act, 2005. The department must respond within 30 days.',
      actionPlan: [
        'Identify the Public Information Officer (PIO) of the concerned department.',
        'Specify the exact information, records, or documents you require.',
        'Draft your RTI application clearly and concisely.',
        'Pay the prescribed application fee (₹10 for central departments).',
        'File an appeal with the First Appellate Authority if no response is received in 30 days.'
      ],
      documents: ['Aadhaar / ID Proof', 'Application Fee Receipt / Postal Order', 'Draft RTI Application'],
      sources: [{ org: 'Department of Personnel & Training', dept: 'Central Information Commission', label: 'Official Portal' }]
    },
    schemes: {
      keywords: ['scheme', 'yojana', 'eligible', 'benefit', 'subsidy', 'pension', 'farmer', 'pm-kisan', 'housing'],
      reply: 'India offers several central and state welfare schemes for citizens, farmers, women, and workers providing direct financial assistance, housing, and healthcare.',
      actionPlan: [
        'Verify your category, income level, and residency status.',
        'Check eligibility criteria for key schemes like PM-KISAN, PMAY, or Ayushman Bharat.',
        'Gather essential documents including Aadhaar, Income, and Caste certificates.',
        'Apply online through official portals or visit your local Common Service Centre (CSC).',
        'Track application status using your reference ID.'
      ],
      documents: ['Aadhaar Card', 'Income Certificate', 'Domicile / State Residence Certificate', 'Bank Passbook'],
      sources: [{ org: 'Government of India', dept: 'MyScheme Portal', label: 'Official Scheme Repository' }]
    },
    salary: {
      keywords: ['salary', 'wages', 'employer', 'company', 'unpaid', 'not paid', 'job', 'labour'],
      reply: 'Under the Payment of Wages Act and Industrial Disputes Act, employers are legally obligated to pay agreed wages on time. Non-payment is a violation of labour rights.',
      actionPlan: [
        'Gather your employment contract, offer letter, and salary slips.',
        'Export bank statements highlighting the missing salary credit.',
        'Send a formal demand letter to HR or management via registered email.',
        'File a formal grievance with the District Labour Commissioner (LC).',
        'Approach the Labour Court if your employer fails to respond.'
      ],
      documents: ['Offer Letter / Employment Contract', 'Salary Slips', 'Bank Statement', 'Email Correspondence'],
      sources: [{ org: 'Ministry of Labour & Employment', dept: 'Office of Labour Commissioner', label: 'Statutory Authority' }]
    },
    consumer: {
      keywords: ['consumer', 'defective', 'refund', 'complaint', 'product', 'warranty', 'service', 'fraud'],
      reply: 'Under the Consumer Protection Act 2019, you have the right to seek replacement, refund, or compensation for defective goods or deficient services.',
      actionPlan: [
        'Keep the purchase tax invoice, warranty card, and payment proof.',
        'Take photos or videos documenting the defect or service failure.',
        'Send a written legal notice to the seller or manufacturer.',
        'Register your complaint on the National Consumer Helpline (NCH 1915).',
        'File an e-daakhil complaint in the Consumer Dispute Redressal Commission.'
      ],
      documents: ['Tax Invoice / Receipt', 'Warranty Card', 'Defect Proof (Photos/Videos)', 'NCH Complaint Copy'],
      sources: [{ org: 'Department of Consumer Affairs', dept: 'National Consumer Helpline', label: 'Official Portal' }]
    },
    fallback: {
      reply: 'I understand your situation. NyayaSaathi AI is here to clarify your rights, required documentation, and official step-by-step procedures.',
      actionPlan: [
        'Provide specific details about the government department or issue.',
        'We will extract your legal rights and relevant laws.',
        'Generate application templates and locate local authorities.'
      ],
      documents: ['Government ID Proof (Aadhaar / Voter ID)', 'Relevant Receipts or Letters'],
      sources: [{ org: 'Government of India', dept: 'Department of Justice', label: 'Civic Portal' }]
    }
  },

  hi: {
    tenant: {
      keywords: ['landlord', 'deposit', 'rent', 'tenant', 'eviction', 'rental', 'मकान मालिक', 'किराया', 'जमा राशि', 'खाली'],
      reply: 'मैं आपकी स्थिति समझता हूँ। मॉडल किराएदारी अधिनियम और भारतीय किरायेदार अधिकारों के तहत, आपका मकान मालिक आपकी सुरक्षा जमा राशि (Security Deposit) को बिना कारण नहीं रोक सकता और न ही बिना कानूनी नोटिस दिए बेदखल कर सकता है।',
      actionPlan: [
        'अपना लिखित किराया समझौता (Rent Agreement) और किराए की रसीदें एकत्र करें।',
        'जमा राशि के भुगतान का प्रमाण (बैंक विवरण या रसीद) संभाल कर रखें।',
        'मकान मालिक को एक औपचारिक लिखित अनुरोध या कानूनी नोटिस भेजें।',
        'सभी व्हाट्सएप संदेशों, कॉल और पत्रों का रिकॉर्ड रखें।',
        'यदि 15 दिनों में समाधान न हो, तो किराया नियंत्रण प्राधिकरण (Rent Tribunal) से संपर्क करें।'
      ],
      documents: ['किराया समझौता (Rent Agreement)', 'सुरक्षा जमा राशि रसीद', 'बैंक भुगतान प्रमाण', 'लिखित संचार रिकॉर्ड'],
      sources: [{ org: 'आवासन और शहरी कार्य मंत्रालय', dept: 'मॉडल टिनेंसी एक्ट', label: 'दिशा-निर्देश' }]
    },
    rti: {
      keywords: ['rti', 'right to information', 'information act', 'file rti', 'सूचना का अधिकार', 'आरटीआई', 'जानकारी'],
      reply: 'सूचना का अधिकार अधिनियम, 2005 के तहत आपको किसी भी सरकारी विभाग से जानकारी मांगने का कानूनी अधिकार है। विभाग को 30 दिनों के भीतर जवाब देना अनिवार्य है।',
      actionPlan: [
        'संबंधित विभाग के जन सूचना अधिकारी (PIO) की पहचान करें।',
        'मांगी जाने वाली जानकारी या दस्तावेज़ों का स्पष्ट उल्लेख करें।',
        'अपना आरटीआई आवेदन सरल और स्पष्ट भाषा में लिखें।',
        'निर्धारित आवेदन शुल्क (केंद्रीय विभागों के लिए ₹10) का भुगतान करें।',
        '30 दिनों में जवाब न मिलने पर प्रथम अपीलीय अधिकारी (First Appellate Authority) के समक्ष अपील करें।'
      ],
      documents: ['आधार कार्ड / पहचान पत्र', 'आवेदन शुल्क रसीद / पोस्टर ऑर्डर', 'आरटीआई आवेदन का ड्राफ्ट'],
      sources: [{ org: 'कार्मिक और प्रशिक्षण विभाग', dept: 'केंद्रीय सूचना आयोग', label: 'आधिकारिक पोर्टल' }]
    },
    schemes: {
      keywords: ['scheme', 'yojana', 'eligible', 'benefit', 'subsidy', 'pension', 'yojna', 'योजना', 'पात्र', 'लाभ', 'किसान', 'पेंशन'],
      reply: 'भारत सरकार और राज्य सरकारें नागरिकों, किसानों, महिलाओं और मजदूरों के लिए वित्तीय सहायता, आवास और स्वास्थ्य सुरक्षा प्रदान करने वाली कई योजनाएं संचालित करती हैं।',
      actionPlan: [
        'अपनी श्रेणी, आय सीमा और राज्य निवास स्थिति का मिलान करें।',
        'पीएम-किसान, पीएम आवास योजना या आयुष्मान भारत जैसी प्रमुख योजनाओं की पात्रता जांचें।',
        'आधार कार्ड, आय प्रमाण पत्र और जाति प्रमाण पत्र जैसे आवश्यक दस्तावेज़ एकत्र करें।',
        'आधिकारिक पोर्टल या नजदीकी जन सेवा केंद्र (CSC) के माध्यम से आवेदन करें।',
        'अपने रेफरेंस नंबर का उपयोग करके आवेदन की स्थिति ट्रैक करें।'
      ],
      documents: ['आधार कार्ड', 'आय प्रमाण पत्र', 'मूल निवास प्रमाण पत्र', 'बैंक पासबुक'],
      sources: [{ org: 'भारत सरकार', dept: 'मायस्कीम पोर्टल (MyScheme)', label: 'आधिकारिक योजना भंडार' }]
    },
    salary: {
      keywords: ['salary', 'wages', 'employer', 'company', 'unpaid', 'เวतन', 'वेतन', 'पगार', 'कंपनी', 'मजबूरी', 'कर्मचारी'],
      reply: 'मजदूरी भुगतान अधिनियम के तहत, नियोक्ता समय पर तय वेतन का भुगतान करने के लिए कानूनी रूप से बाध्य हैं। वेतन न देना श्रम अधिकारों का उल्लंघन है।',
      actionPlan: [
        'अपना नियुक्ति पत्र (Offer Letter) और सैलरी स्लिप एकत्र करें।',
        'बैंक विवरण निकालें जिसमें बकाया वेतन दर्शाया गया हो।',
        'कंपनी के एचआर या प्रबंधन को ईमेल द्वारा लिखित मांग पत्र भेजें।',
        'जिला श्रम आयुक्त (Labour Commissioner) के पास शिकायत दर्ज कराएं।',
        'समाधान न होने पर श्रम न्यायालय (Labour Court) का रुख करें।'
      ],
      documents: ['नियुक्ति पत्र / अनुबंध', 'वेतन पर्ची (Salary Slips)', 'बैंक स्टेटमेंट', 'ईमेल पत्राचार'],
      sources: [{ org: 'श्रम और रोजगार मंत्रालय', dept: 'श्रम आयुक्त कार्यालय', label: 'वैधानिक प्राधिकरण' }]
    },
    consumer: {
      keywords: ['consumer', 'defective', 'refund', 'complaint', 'product', 'उपभोक्ता', 'शिकायत', 'खराब', 'रिफंड', 'सामान'],
      reply: 'उपभोक्ता संरक्षण अधिनियम 2019 के तहत, खराब सामान या घटिया सेवा के लिए आपको उत्पाद बदलने, रिफंड पाने या मुआवजे का पूरा अधिकार है।',
      actionPlan: [
        'खरीद का बिल (Invoice), वारंटी कार्ड और भुगतान का प्रमाण सुरक्षित रखें।',
        'खराब उत्पाद या सेवा में कमी की तस्वीरें या वीडियो लें।',
        'विक्रेता या निर्माता को लिखित शिकायत/कानूनी नोटिस भेजें।',
        'राष्ट्रीय उपभोक्ता हेल्पलाइन (NCH 1915) पर शिकायत दर्ज करें।',
        'ई-दाखिल (e-daakhil) पोर्टल के जरिए उपभोक्ता अदालत में शिकायत दर्ज करें।'
      ],
      documents: ['खरीद बिल (Invoice)', 'वारंटी कार्ड', 'खराबी का सबूत (फोटो/वीडियो)', 'एनसीएच शिकायत प्रति'],
      sources: [{ org: 'उपभोक्ता मामले विभाग', dept: 'राष्ट्रीय उपभोक्ता हेल्पलाइन', label: 'आधिकारिक सेवा' }]
    },
    fallback: {
      reply: 'मैं आपकी समस्या समझ रहा हूँ। न्यायसाथी एआई आपके अधिकारों, आवश्यक दस्तावेज़ों और आधिकारिक कानूनी प्रक्रिया में मार्गदर्शन के लिए तैयार है।',
      actionPlan: [
        'अपनी समस्या या संबंधित विभाग का स्पष्ट विवरण साझा करें।',
        'हम संबंधित कानूनों और आपके अधिकारों का विश्लेषण करेंगे।',
        'आवेदन का प्रारूप और संबंधित सरकारी कार्यालय की जानकारी प्राप्त करें।'
      ],
      documents: ['सरकारी पहचान पत्र (आधार / वोटर आईडी)', 'संबंधित रसीदें या पत्र'],
      sources: [{ org: 'भारत सरकार', dept: 'न्याय विभाग', label: 'नागरिक पोर्टल' }]
    }
  },

  mr: {
    tenant: {
      keywords: ['landlord', 'deposit', 'rent', 'tenant', 'eviction', 'rental', 'घरमालक', 'भाडे', 'ठेव', 'भाडेकरू', 'खाली'],
      reply: 'मी तुमची समस्या समजतो. मॉडेल भाडेकरू कायदा आणि भाडेकरू हक्कांसंदर्भातील कायद्यांनुसार, तुमचा घरमालक तुमची अनामत रक्कम (Security Deposit) विनाकारण रोखून ठेवू शकत नाही किंवा कायदेशीर नोटीसशिवाय तुम्हाला घराबाहेर काढू शकत नाही.',
      actionPlan: [
        'तुमचा लेखी भाडे करार (Rent Agreement) आणि भाड्याच्या पावत्या गोळा करा.',
        'अनामत रक्कम दिल्याचे पुरावे (बँक स्टेटमेंट किंवा पावती) सुरक्षित ठेवा.',
        'घरमालकाला औपचारिक लेखी विनंती किंवा कायदेशीर नोटीस पाठवा.',
        'सर्व व्हॉट्सअ‍ॅप संदेश, कॉल्स आणि पत्रांच्या नोंदी ठेवा.',
        '१५ दिवसांत तोडगा न निघाल्यास भाडे नियंत्रण न्यायाधिकरणाकडे (Rent Tribunal) दाद मागा.'
      ],
      documents: ['भाडे करार (Rent Agreement)', 'अनामत रक्कम पावती', 'बँक पेमेंट पुरावा', 'लेखी पत्रव्यवहार'],
      sources: [{ org: 'गृहनिर्माण आणि सक्षमीकरण मंत्रालय', dept: 'मॉडेल टिनन्सी अ‍ॅक्ट', label: 'मार्गदर्शक तत्त्वे' }]
    },
    rti: {
      keywords: ['rti', 'right to information', 'information act', 'file rti', 'माहिती अधिकार', 'आरटीआय', 'माहिती'],
      reply: 'माहिती अधिकार कायदा, २००५ अंतर्गत तुम्हाला कोणत्याही शासकीय विभागाकडून माहिती मागवण्याचा कायदेशीर हक्क आहे. संबंधित विभागाने ३० दिवसांच्या आत उत्तर देणे बंधनकारक आहे.',
      actionPlan: [
        'संबंधित विभागाच्या जन माहिती अधिकाऱ्याची (PIO) ओळख पटवा.',
        'मागवलेली अचूक माहिती, नोंदी किंवा कागदपत्रे स्पष्टपणे नमूद करा.',
        'तुमचा माहिती अधिकार अर्ज सोप्या आणि स्पष्ट भाषेत तयार करा.',
        'नियमानुसार अर्ज शुल्क (केंद्रीय विभागांसाठी ₹१०) भरा.',
        '३० दिवसांत उत्तर न मिळाल्यास प्रथम अपिलीय अधिकाऱ्याकडे (First Appellate Authority) अपील करा.'
      ],
      documents: ['आधार कार्ड / ओळखपत्र', 'अर्ज शुल्क पावती / पोस्टल ऑर्डर', 'RTI अर्जाचा मसुदा'],
      sources: [{ org: 'कार्मिक आणि प्रशिक्षण विभाग', dept: 'केंद्रीय माहिती आयोग', label: 'अधिकृत पोर्टल' }]
    },
    schemes: {
      keywords: ['scheme', 'yojana', 'eligible', 'benefit', 'subsidy', 'pension', 'योजना', 'पात्र', 'लाभ', 'शेतकरी', 'पेन्शन'],
      reply: 'भारत सरकार आणि राज्य सरकार नागरिकांसाठी, शेतकऱ्यांसाठी, महिलांसाठी आणि कामगारांसाठी आर्थिक मदत, गृहनिर्माण आणि आरोग्य सेवा देणाऱ्या अनेक योजना राबवतात.',
      actionPlan: [
        'तुमचा प्रवर्ग, उत्पन्न मर्यादा आणि राज्याचे रहिवासी प्रमाणपत्र तपासा.',
        'पीएम-किसान, पीएम आवास योजना किंवा आयुष्यमान भारत यांसारख्या योजनांची पात्रता तपासा.',
        'आधार कार्ड, उत्पन्न दाखला आणि रहिवासी दाखला यांसारखी आवश्यक कागदपत्रे गोळा करा.',
        'अधिकृत पोर्टलवरून किंवा जवळच्या महा-ई-सेवा केंद्रातून (CSC) अर्ज करा.',
        'तुमच्या संदर्भ क्रमांकाचा वापर करून अर्जाची स्थिती ट्रॅक करा.'
      ],
      documents: ['आधार कार्ड', 'उत्पन्नाचा दाखला', 'रहिवासी दाखला (Domicile)', 'बँक पासबुक'],
      sources: [{ org: 'भारत सरकार', dept: 'मायस्कीम पोर्टल (MyScheme)', label: 'अधिकृत योजना दालन' }]
    },
    salary: {
      keywords: ['salary', 'wages', 'employer', 'company', 'unpaid', 'पगार', 'वेतन', 'मालक', 'कंपनी', 'थकबाकी', 'कामगार'],
      reply: 'वेतन भरणा कायद्यानुसार, मालकाने ठरलेले वेतन वेळेत देणे कायदेशीरदृष्ट्या बंधनकारक आहे. पगार न देणे हे कामगार हक्कांचे उल्लंघन आहे.',
      actionPlan: [
        'तुमचे नियुक्ती पत्र (Offer Letter) आणि पगार स्लिप्स एकत्र करा.',
        'बँक स्टेटमेंट काढा ज्यामध्ये थकीत पगार स्पष्ट दिसून येईल.',
        'कंपनीच्या एचआर किंवा व्यवस्थापनाला ईमेलद्वारे लेखी मागणीपत्र पाठवा.',
        'जिल्हा कामगार आयुक्तांकडे (Labour Commissioner) तक्रार नोंदवा.',
        'तोडगा न निघाल्यास कामगार न्यायालयात (Labour Court) दाद मागा.'
      ],
      documents: ['नियुक्ती पत्र / करार', 'पगार स्लिप्स (Salary Slips)', 'बँक स्टेटमेंट', 'ईमेल पत्रव्यवहार'],
      sources: [{ org: 'कामगार आणि रोजगार मंत्रालय', dept: 'कामगार आयुक्त कार्यालय', label: 'वैधानिक प्राधिकरण' }]
    },
    consumer: {
      keywords: ['consumer', 'defective', 'refund', 'complaint', 'product', 'ग्राहक', 'तक्रार', 'खराब', 'रिफंड', 'वस्तू'],
      reply: 'ग्राहक संरक्षण कायदा २०१९ अंतर्गत, खराब वस्तू किंवा सदोष सेवेबद्दल वस्तू बदलून मिळणे, रिफंड मिळणे किंवा भरपाई मिळण्याचा तुम्हाला पूर्ण अधिकार आहे.',
      actionPlan: [
        'खरेदीचे बिल (Invoice), वॉरंटी कार्ड आणि पेमेंट पुरावा सुरक्षित ठेवा.',
        'खराब वस्तूचे किंवा सेवेतील त्रुटींचे फोटो अथवा व्हिडिओ काढा.',
        'विक्रेता किंवा उत्पादन कंपनीला लेखी तक्रार / कायदेशीर नोटीस पाठवा.',
        'राष्ट्रीय ग्राहक हेल्पलाइनवर (NCH 1915) तक्रार नोंदवा.',
        'ई-दाखल (e-daakhil) पोर्टलद्वारे ग्राहक न्यायालयात अर्ज दाखल करा.'
      ],
      documents: ['खरेदी बिल (Invoice)', 'वॉरंटी कार्ड', 'त्रुटींचा पुरावा (फोटो/व्हिडिओ)', 'NCH तक्रार प्रत'],
      sources: [{ org: 'ग्राहक व्यवहार विभाग', dept: 'राष्ट्रीय ग्राहक हेल्पलाइन', label: 'अधिकृत सेवा' }]
    },
    fallback: {
      reply: 'मी तुमची समस्या समजून घेत आहे. न्यायसाथी AI तुमच्या हक्कांबद्दल, आवश्यक कागदपत्रांबद्दल आणि अधिकृत कायदेशीर प्रक्रियेबद्दल मार्गदर्शन करण्यास तयार आहे.',
      actionPlan: [
        'तुमची अडचण किंवा संबंधित सरकारी विभागाबद्दल अधिक माहिती सांगा.',
        'आम्ही संबंधित कायदे आणि तुमच्या हक्कांचे विश्लेषण करू.',
        'अर्जाचा मसुदा आणि संबंधित सरकारी कार्यालयाची माहिती मिळवा.'
      ],
      documents: ['सरकारी ओळखपत्र (आधार / मतदार ओळखपत्र)', 'संबंधित पावत्या किंवा पत्रे'],
      sources: [{ org: 'भारत सरकार', dept: 'न्याय विभाग', label: 'नागरी पोर्टल' }]
    }
  }
};

export function getMultilingualMockResponse(userText, lang = 'en') {
  const currentLang = ['en', 'hi', 'mr'].includes(lang) ? lang : 'en';
  const langResponses = multilingualResponses[currentLang] || multilingualResponses['en'];
  const text = (userText || '').toLowerCase();

  for (const categoryKey of ['tenant', 'rti', 'schemes', 'salary', 'consumer']) {
    const item = langResponses[categoryKey];
    if (item && item.keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      return item;
    }
  }

  // Also check English keywords as fallback matching across languages
  for (const categoryKey of ['tenant', 'rti', 'schemes', 'salary', 'consumer']) {
    const enItem = multilingualResponses['en'][categoryKey];
    if (enItem && enItem.keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      return langResponses[categoryKey] || enItem;
    }
  }

  return langResponses.fallback;
}
