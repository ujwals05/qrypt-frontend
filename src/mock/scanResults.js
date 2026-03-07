export const scanResults = {
  scan_id: "scan-9921-x01",
  timestamp: new Date().toISOString(),
  image_hash: "7d8f9e2a1b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c",
  qr_extraction: {
    success: true,
    count: 1,
    qr_codes: [{ 
      content: "https://bit.ly/3xPhish", 
      bounding_box: { x: 120, y: 80, width: 250, height: 250 } 
    }]
  },
  physical_analysis: {
    tampered: true,
    confidence: 78,
    evidence: "Overlay contour detected at (124, 89)",
    checks: {
      EDGE_ANOMALY: { triggered: true, confidence: 65, evidence: "Irregular sharp edges detected on QR modules." },
      OVERLAY_CONTOUR: { triggered: true, confidence: 78, evidence: "Physical overlay detected on top of original print." },
      PARTIAL_OBSTRUCT: { triggered: false, confidence: 0, evidence: "No obstructions found." },
      CONTRAST_IRREGULAR: { triggered: true, confidence: 55, evidence: "Inconsistent ink density across the QR area." }
    }
  },
  url_intelligence: {
    original_url: "https://bit.ly/3xPhish",
    final_url: "https://paypa1-secure-login.xyz/verify",
    redirect_chain: [
      { hop: 0, url: "https://bit.ly/3xPhish", status_code: 301, is_shortener: true },
      { hop: 1, url: "https://redirect.me/go", status_code: 302, is_shortener: false },
      { hop: 2, url: "https://paypa1-secure-login.xyz/verify", status_code: 200, is_shortener: false }
    ],
    hops: 2,
    domain: "paypa1-secure-login.xyz",
    tld: "xyz",
    tld_risk_score: 75,
    domain_entropy: 4.21,
    suspicious_keywords: ["paypal", "secure", "login", "verify"],
    keyword_score: 72,
    is_shortener: true,
    ssl: { valid: false, error: "Certificate verification failed" },
    overall_url_risk: 88
  },
  threat_intel: {
    malicious_count: 14,
    total_engines: 72,
    reputation_class: "MALICIOUS",
    threat_score: 85,
    cached: false,
    previously_seen: 3
  },
  ai_context: {
    visual_context: "Promotional poster mimicking PayPal branding with official logo and blue color scheme",
    expected_brand: "PayPal",
    url_match: "MISMATCH",
    impersonation_probability: 0.94,
    confidence: 0.91,
    explanation: "Visual branding matches PayPal but URL domain uses character substitution (paypa1 instead of paypal) — classic phishing pattern."
  },
  risk: {
    score: 82,
    verdict: "CRITICAL",
    breakdown: {
      physical_score: 78,
      physical_weight: 0.3,
      threat_intel_score: 85,
      threat_intel_weight: 0.3,
      ai_context_score: 88,
      ai_context_weight: 0.4
    }
  },
  processing_time_ms: 3241
};

export const scanHistory = [
  {
    scan_id: "scan-9921-x01",
    timestamp: "2024-03-07T14:30:00Z",
    domain: "paypa1-secure-login.xyz",
    verdict: "CRITICAL",
    risk_score: 82,
    thumbnail: "phish_thumb.png"
  },
  {
    scan_id: "scan-9922-a12",
    timestamp: "2024-03-07T12:15:00Z",
    domain: "google.com",
    verdict: "SAFE",
    risk_score: 5,
    thumbnail: "google_thumb.png"
  },
  {
    scan_id: "scan-9923-b45",
    timestamp: "2024-03-06T18:45:00Z",
    domain: "bit.ly/discount-shoes",
    verdict: "MEDIUM_RISK",
    risk_score: 52,
    thumbnail: "shoes_thumb.png"
  },
  {
    scan_id: "scan-9924-c78",
    timestamp: "2024-03-06T10:20:00Z",
    domain: "bank-auth.verify-account.net",
    verdict: "HIGH_RISK",
    risk_score: 78,
    thumbnail: "bank_thumb.png"
  },
  {
    scan_id: "scan-9925-d90",
    timestamp: "2024-03-05T15:10:00Z",
    domain: "local-cafe.menu",
    verdict: "LOW_RISK",
    risk_score: 22,
    thumbnail: "cafe_thumb.png"
  }
];
