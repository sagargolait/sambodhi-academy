export function generateMetadataFromPayload(payloadData: any) {
  if (!payloadData) {
    console.warn("Payload data is missing, returning default metadata.");
    return {
      title:
        "Best Coaching Classes for MPSC, Police Bharti, Talathi Bharti, ZP Bharti, SSC, Banking, Railway, IBPS, CA, Nursing, MES Maharashtra government exams | SambodhiAcademy",
      description:
        "SambodhiAcademy offers expert coaching for MPSC, Police Bharti, Talathi Bharti, ZP Bharti, SSC, Banking, Railway, IBPS, CA, Nursing, MES, and other Maharashtra government exams. Enroll now for top-notch guidance and mock tests!",
      keywords:
        "MPSC, Police Bharti, Talathi Bharti, ZP Bharti, SSC, Banking, Railway, IBPS, CA, Nursing, MES Maharashtra government exams",
      openGraph: {
        title:
          "Best Maharashtra Government Exam Preparation Institute | SambodhiAcademy",
        description:
          "SambodhiAcademy offers expert coaching for MPSC, Police Bharti, Talathi Bharti, ZP Bharti, SSC, Banking, Railway, and other Maharashtra government exams. Enroll now for top-notch guidance and mock tests!",
        url: "https://sambodhiAcademy.com",
        siteName: "Sambodhi Academy",
        images: [
          {
            url: "/default-image.png",
            width: 1200,
            height: 630,
            alt: "Default Image",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "Sambodhi Academy Government Exam Preparation Institute",
        title:
          "Best Maharashtra Government Exam Preparation Institute | SambodhiAcademy",
        description:
          "SambodhiAcademy offers expert coaching for MPSC, Police Bharti, Talathi Bharti, ZP Bharti, SSC, Banking, Railway, and other Maharashtra government exams. Enroll now for top-notch guidance and mock tests!",
        images: ["/default-image.png"],
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      appLinks: {
        android: {
          package:
            "https://play.google.com/store/apps/details?id=co.white.tqqcq",
          app_name: "sambodhi academy",
        },
        web: {
          url: "https://sambodhiacademy.com/",
          should_fallback: true,
        },
      },
    };
  }

  // Extract fields from Payload CMS response
  const {
    title = "Untitled Page",
    description = "No description available.",
    slug = "",
    image = {},
  } = payloadData;

  console.log("Payload data:", payloadData);

  const imageUrl = image?.url || "/default-image.png";
  const pageUrl = `https://example.com/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Your Site Name",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
