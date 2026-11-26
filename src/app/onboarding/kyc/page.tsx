"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Building2,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  Globe,
  Trash2,
  Plus,
  Landmark,
  Scale,
  BadgeCheck,
  Users,
  Briefcase,
  AlertTriangle,
  Lock,
  Layers,
  Save,
  Trees,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { KycDocumentType, RegistrationType } from "@/types/auth";
import { KYC_DOCUMENT_LABELS } from "@/types/auth";

const REGISTRATION_TYPES: { value: RegistrationType; label: string }[] = [
  { value: "PRIVATE_LIMITED", label: "Private Limited Company (Pvt Ltd)" },
  { value: "LLP", label: "Limited Liability Partnership (LLP)" },
  { value: "PARTNERSHIP", label: "Registered Partnership" },
  { value: "SOLE_PROPRIETORSHIP", label: "Sole Proprietorship" },
  { value: "TRUST", label: "Registered Trust" },
  { value: "SOCIETY", label: "Registered Society" },
  { value: "GOVERNMENT", label: "Government / Public Sector Unit (PSU)" },
  { value: "OTHER", label: "Other Corporate Form" },
];

const SECTORS = [
  "Carbon Credits & Project Development",
  "Renewable Energy (Solar / Wind / Hydro)",
  "Afforestation, Reforestation & Agroforestry (ARR)",
  "Bio-energy, Biogas & Waste-to-Energy",
  "Industrial Energy Efficiency & Methane Abatement",
  "Agriculture, Soil Carbon & Biochar",
  "Blue Carbon & Coastal Wetlands",
  "ESG Advisory, Banking & Commodities Trading",
  "Other Industrial / Commercial Sector",
];

const REGISTRY_OPTIONS = [
  "Verra Verified Carbon Standard (VCS)",
  "Gold Standard (GS)",
  "Indian Carbon Registry (ICR) / BEE CCTS",
  "Evident International REC (I-REC)",
  "Global Carbon Council (GCC)",
  "Puro.earth (Engineered Removals)",
  "American Carbon Registry (ACR)",
  "Climate Action Reserve (CAR)",
  "Plan Vivo",
  "Other National / Bilateral Registry",
];

const MANDATORY_DOCS: KycDocumentType[] = [
  "CERTIFICATE_OF_INCORPORATION",
  "PAN_CARD",
  "GST_CERTIFICATE",
  "BOARD_RESOLUTION",
  "BANK_STATEMENT",
  "ADDRESS_PROOF",
  "AUTHORIZED_SIGNATORY_ID",
];

export default function KycOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState<number>(1);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [draftSaving, setDraftSaving] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = React.useState<string | null>(null);

  // User & Org Metadata
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [entityCategory, setEntityCategory] = React.useState<"SELLER" | "BUYER" | "TRADER_BROKER">("SELLER");

  // Step 1: Organization Identification
  const [legalName, setLegalName] = React.useState("");
  const [tradeName, setTradeName] = React.useState("");
  const [registrationType, setRegistrationType] = React.useState<RegistrationType>("PRIVATE_LIMITED");
  const [registrationNumber, setRegistrationNumber] = React.useState("");
  const [pan, setPan] = React.useState("");
  const [gstin, setGstin] = React.useState("");
  const [dateOfIncorporation, setDateOfIncorporation] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [addressLine1, setAddressLine1] = React.useState("");
  const [addressLine2, setAddressLine2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [country, setCountry] = React.useState("India");

  // Step 2: Nature of Business & Commercials
  const [sector, setSector] = React.useState(SECTORS[0]);
  const [businessScope, setBusinessScope] = React.useState("");
  const [turnover, setTurnover] = React.useState("");
  const [turnoverCurrency, setTurnoverCurrency] = React.useState("INR");
  const [employeeCount, setEmployeeCount] = React.useState("");
  const [sourceOfFunds, setSourceOfFunds] = React.useState<"OPERATIONAL" | "INVESTOR" | "OTHER">("OPERATIONAL");
  const [sourceOfFundsDesc, setSourceOfFundsDesc] = React.useState("");
  const [isPubliclyTraded, setIsPubliclyTraded] = React.useState(false);
  const [stockExchangeCode, setStockExchangeCode] = React.useState("");
  const [isRegulated, setIsRegulated] = React.useState(false);
  const [regulatorName, setRegulatorName] = React.useState("");

  // Step 3: Banking & Settlement Info
  const [accountName, setAccountName] = React.useState("");
  const [bankName, setBankName] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [ifscSwift, setIfscSwift] = React.useState("");
  const [bankBranch, setBankBranch] = React.useState("");
  const [bankCurrency, setBankCurrency] = React.useState("INR");
  const [accountType, setAccountType] = React.useState("Current");

  // Step 4: Beneficial Ownership & Personnel
  const [ubos, setUbos] = React.useState<
    { fullName: string; nationality: string; idType: string; idNumber: string; percentageOwnership: string }[]
  >([{ fullName: "", nationality: "India", idType: "PAN", idNumber: "", percentageOwnership: "100" }]);
  const [noNaturalUbo, setNoNaturalUbo] = React.useState(false);
  const [uboExemptionReason, setUboExemptionReason] = React.useState("");

  // Key Contacts
  const [frontName, setFrontName] = React.useState("");
  const [frontDesignation, setFrontDesignation] = React.useState("");
  const [frontPhone, setFrontPhone] = React.useState("");
  const [frontEmail, setFrontEmail] = React.useState("");

  const [backName, setBackName] = React.useState("");
  const [backDesignation, setBackDesignation] = React.useState("");
  const [backPhone, setBackPhone] = React.useState("");
  const [backEmail, setBackEmail] = React.useState("");

  // Authorized Signatories
  const [signatories, setSignatories] = React.useState<
    { fullName: string; designation: string; nationality: string; idType: string; idNumber: string; signingAuthority: string }[]
  >([{ fullName: "", designation: "Director", nationality: "India", idType: "PAN", idNumber: "", signingAuthority: "Solo" }]);

  // Step 5: Registry Accounts & Project Details
  const [selectedRegistries, setSelectedRegistries] = React.useState<
    { registry: string; accountName: string; accountNumber: string; authorizedRep: string }[]
  >([]);

  // For Sellers: Project Details
  const [projectName, setProjectName] = React.useState("");
  const [projectRegistry, setProjectRegistry] = React.useState(REGISTRY_OPTIONS[0]);
  const [registryProjectId, setRegistryProjectId] = React.useState("");
  const [projectMethodology, setProjectMethodology] = React.useState("");
  const [projectSector, setProjectSector] = React.useState("Renewable Energy");
  const [projectLocation, setProjectLocation] = React.useState("");
  const [creditingPeriod, setCreditingPeriod] = React.useState("");
  const [estAnnualCredits, setEstAnnualCredits] = React.useState("");
  const [vintageYears, setVintageYears] = React.useState("");
  const [creditsOffered, setCreditsOffered] = React.useState("");

  // Step 6: Regulatory Compliance Declarations
  const [actingOnBehalf, setActingOnBehalf] = React.useState(false);
  const [actingOnBehalfDesc, setActingOnBehalfDesc] = React.useState("");
  const [pepInvolved, setPepInvolved] = React.useState(false);
  const [pepDetails, setPepDetails] = React.useState("");
  const [sanctionsSubject, setSanctionsSubject] = React.useState(false);
  const [sanctionsDetails, setSanctionsDetails] = React.useState("");
  const [legalDisputes, setLegalDisputes] = React.useState(false);
  const [legalDisputesDetails, setLegalDisputesDetails] = React.useState("");
  const [relatedParty, setRelatedParty] = React.useState(false);
  const [relatedPartyDetails, setRelatedPartyDetails] = React.useState("");

  // Step 7: Documents
  const [uploadedDocs, setUploadedDocs] = React.useState<
    { id: string; documentType: KycDocumentType; fileName: string }[]
  >([]);
  const [uploadingType, setUploadingType] = React.useState<KycDocumentType | null>(null);

  // Step 8: Declaration & Undertaking
  const [declarantName, setDeclarantName] = React.useState("");
  const [declarantDesignation, setDeclarantDesignation] = React.useState("");
  const [declarationDate, setDeclarationDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [declarationAccepted, setDeclarationAccepted] = React.useState(false);

  // Load existing profile & draft
  React.useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/kyc/current");
        if (res.status === 401) {
          router.push("/login?next=/onboarding/kyc");
          return;
        }
        const data = await res.json();

        if (data.profile) {
          setUserProfile(data.profile);
          setEntityCategory(data.profile.role === "SELLER" ? "SELLER" : "BUYER");
          setFrontName(data.profile.full_name || "");
          setFrontEmail(data.profile.email || "");
          setFrontPhone(data.profile.phone || "");
          setDeclarantName(data.profile.full_name || "");
        }

        if (data.organization) {
          const org = data.organization;
          if (org.kyc_status === "APPROVED") {
            router.push(data.profile.role === "SELLER" ? "/dashboard/seller" : "/dashboard/buyer");
            return;
          }

          if (org.entity_category) setEntityCategory(org.entity_category);
          setLegalName(org.legal_name || "");
          setTradeName(org.trade_name || "");
          setRegistrationType(org.registration_type || "PRIVATE_LIMITED");
          setRegistrationNumber(org.registration_number || "");
          setPan(org.pan || "");
          setGstin(org.gstin || "");
          setAddressLine1(org.address_line_1 || "");
          setAddressLine2(org.address_line_2 || "");
          setCity(org.city || "");
          setState(org.state || "");
          setPincode(org.pincode || "");
          setCountry(org.country || "India");
          setWebsite(org.website || "");

          if (org.business_details) {
            setSector(org.business_details.sector || SECTORS[0]);
            setBusinessScope(org.business_details.natureOfBusiness || "");
            setTurnover(org.business_details.turnover || "");
            setTurnoverCurrency(org.business_details.turnoverCurrency || "INR");
            setEmployeeCount(org.business_details.employeeCount || "");
            setDateOfIncorporation(org.business_details.dateOfIncorporation || "");
            setSourceOfFunds(org.business_details.sourceOfFunds || "OPERATIONAL");
            setSourceOfFundsDesc(org.business_details.sourceOfFundsDesc || "");
            setIsPubliclyTraded(!!org.business_details.isPubliclyTraded);
            setStockExchangeCode(org.business_details.stockExchangeCode || "");
            setIsRegulated(!!org.business_details.isRegulated);
            setRegulatorName(org.business_details.regulatorName || "");
          }

          if (org.bank_details) {
            setAccountName(org.bank_details.accountName || org.legal_name || "");
            setBankName(org.bank_details.bankName || "");
            setAccountNumber(org.bank_details.accountNumber || "");
            setIfscSwift(org.bank_details.ifscSwift || "");
            setBankBranch(org.bank_details.branchAddress || "");
            setBankCurrency(org.bank_details.currency || "INR");
            setAccountType(org.bank_details.accountType || "Current");
          }

          if (org.ubo_details && Array.isArray(org.ubo_details) && org.ubo_details.length > 0) {
            setUbos(org.ubo_details);
          }
          if (org.ubo_exemptions) {
            setNoNaturalUbo(!!org.ubo_exemptions.noNaturalUbo);
            setUboExemptionReason(org.ubo_exemptions.otherReason || "");
          }

          if (org.contact_persons) {
            if (org.contact_persons.frontOffice) {
              setFrontName(org.contact_persons.frontOffice.name || data.profile.full_name || "");
              setFrontDesignation(org.contact_persons.frontOffice.designation || "");
              setFrontPhone(org.contact_persons.frontOffice.phone || data.profile.phone || "");
              setFrontEmail(org.contact_persons.frontOffice.email || data.profile.email || "");
            }
            if (org.contact_persons.backOffice) {
              setBackName(org.contact_persons.backOffice.name || "");
              setBackDesignation(org.contact_persons.backOffice.designation || "");
              setBackPhone(org.contact_persons.backOffice.phone || "");
              setBackEmail(org.contact_persons.backOffice.email || "");
            }
          }

          if (org.authorized_signatories && Array.isArray(org.authorized_signatories) && org.authorized_signatories.length > 0) {
            setSignatories(org.authorized_signatories);
          }

          if (org.registry_accounts && Array.isArray(org.registry_accounts)) {
            setSelectedRegistries(org.registry_accounts);
          }

          if (org.project_details) {
            setProjectName(org.project_details.projectName || "");
            setProjectRegistry(org.project_details.registry || REGISTRY_OPTIONS[0]);
            setRegistryProjectId(org.project_details.registryProjectId || "");
            setProjectMethodology(org.project_details.methodology || "");
            setProjectSector(org.project_details.projectType || "Renewable Energy");
            setProjectLocation(org.project_details.location || "");
            setCreditingPeriod(org.project_details.creditingPeriod || "");
            setEstAnnualCredits(org.project_details.estAnnualCredits || "");
            setVintageYears(org.project_details.vintageYears || "");
            setCreditsOffered(org.project_details.creditsOffered || "");
          }

          if (org.regulatory_declarations) {
            setActingOnBehalf(!!org.regulatory_declarations.actingOnBehalf);
            setActingOnBehalfDesc(org.regulatory_declarations.actingOnBehalfDetails || "");
            setPepInvolved(!!org.regulatory_declarations.pepInvolved);
            setPepDetails(org.regulatory_declarations.pepDetails || "");
            setSanctionsSubject(!!org.regulatory_declarations.sanctionsSubject);
            setSanctionsDetails(org.regulatory_declarations.sanctionsDetails || "");
            setLegalDisputes(!!org.regulatory_declarations.legalDisputes);
            setLegalDisputesDetails(org.regulatory_declarations.legalDisputesDetails || "");
            setRelatedParty(!!org.regulatory_declarations.relatedParty);
            setRelatedPartyDetails(org.regulatory_declarations.relatedPartyDetails || "");
          }

          if (org.declaration_details) {
            setDeclarantName(org.declaration_details.signatoryName || data.profile.full_name || "");
            setDeclarantDesignation(org.declaration_details.designation || "");
          }
        }

        if (data.documents && Array.isArray(data.documents)) {
          setUploadedDocs(
            data.documents.map((d: any) => ({
              id: d.id,
              documentType: d.document_type,
              fileName: d.file_name,
            }))
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  // Construct current payload object
  const buildCurrentPayload = (isFinal = false) => {
    return {
      entityCategory,
      org: {
        legalName: legalName.trim() || (isFinal ? "" : "Draft Organization"),
        tradeName: tradeName.trim() || undefined,
        registrationType,
        registrationNumber: registrationNumber.trim() || undefined,
        gstin: gstin.trim().toUpperCase() || undefined,
        pan: pan.trim().toUpperCase() || (isFinal ? "" : "AAAAA0000A"),
        country: country.trim() || "India",
        state: state.trim() || (isFinal ? "" : "State"),
        city: city.trim() || (isFinal ? "" : "City"),
        addressLine1: addressLine1.trim() || (isFinal ? "" : "Address Line"),
        addressLine2: addressLine2.trim() || undefined,
        pincode: pincode.trim() || (isFinal ? "" : "110001"),
        website: website.trim() || undefined,
      },
      business: {
        sector,
        natureOfBusiness: businessScope.trim() || undefined,
        turnover: turnover.trim() || undefined,
        turnoverCurrency,
        employeeCount: employeeCount.trim() || undefined,
        dateOfIncorporation: dateOfIncorporation.trim() || undefined,
        sourceOfFunds,
        sourceOfFundsDesc: sourceOfFundsDesc.trim() || undefined,
        isPubliclyTraded,
        stockExchangeCode: stockExchangeCode.trim() || undefined,
        isRegulated,
        regulatorName: regulatorName.trim() || undefined,
      },
      bank: {
        accountName: accountName.trim() || legalName.trim() || undefined,
        bankName: bankName.trim() || undefined,
        accountNumber: accountNumber.trim() || undefined,
        ifscSwift: ifscSwift.trim().toUpperCase() || undefined,
        currency: bankCurrency,
        branchAddress: bankBranch.trim() || undefined,
        accountType,
      },
      ubos: noNaturalUbo ? [] : ubos.filter((u) => u.fullName.trim()),
      uboExemptions: {
        noNaturalUbo,
        otherReason: uboExemptionReason.trim() || undefined,
      },
      contacts: {
        frontOffice: {
          name: frontName.trim() || undefined,
          designation: frontDesignation.trim() || undefined,
          phone: frontPhone.trim() || undefined,
          email: frontEmail.trim() || undefined,
        },
        backOffice: {
          name: backName.trim() || undefined,
          designation: backDesignation.trim() || undefined,
          phone: backPhone.trim() || undefined,
          email: backEmail.trim() || undefined,
        },
      },
      signatories: signatories.filter((s) => s.fullName.trim()),
      regulatoryDeclarations: {
        actingOnBehalf,
        actingOnBehalfDetails: actingOnBehalfDesc.trim() || undefined,
        pepInvolved,
        pepDetails: pepDetails.trim() || undefined,
        sanctionsSubject,
        sanctionsDetails: sanctionsDetails.trim() || undefined,
        legalDisputes,
        legalDisputesDetails: legalDisputesDetails.trim() || undefined,
        relatedParty,
        relatedPartyDetails: relatedPartyDetails.trim() || undefined,
      },
      registryAccounts: selectedRegistries.filter((r) => r.accountNumber.trim()),
      project: {
        projectName: projectName.trim() || undefined,
        registry: projectRegistry,
        registryProjectId: registryProjectId.trim() || undefined,
        methodology: projectMethodology.trim() || undefined,
        projectType: projectSector,
        location: projectLocation.trim() || undefined,
        creditingPeriod: creditingPeriod.trim() || undefined,
        estAnnualCredits: estAnnualCredits.trim() || undefined,
        vintageYears: vintageYears.trim() || undefined,
        creditsOffered: creditsOffered.trim() || undefined,
      },
      declaration: {
        signatoryName: declarantName.trim() || undefined,
        designation: declarantDesignation.trim() || undefined,
        date: declarationDate,
        accepted: declarationAccepted,
      },
      declarationAccepted: isFinal ? declarationAccepted : true,
    };
  };

  // Draft Save Handler
  const handleSaveDraft = async () => {
    setDraftSaving(true);
    setSaveSuccessMsg(null);
    setErrorMsg(null);
    try {
      const payload = buildCurrentPayload(false);
      const res = await fetch("/api/kyc/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Could not save draft.");
      } else {
        setSaveSuccessMsg("Institutional progress saved successfully.");
        setTimeout(() => setSaveSuccessMsg(null), 4000);
      }
    } catch {
      setErrorMsg("Network error saving draft.");
    } finally {
      setDraftSaving(false);
    }
  };

  // File Upload Handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    docType: KycDocumentType
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setUploadingType(docType);

    try {
      // Auto-save basic org details first to ensure organization_id exists
      await handleSaveDraft();

      const form = new FormData();
      form.append("file", file);
      form.append("documentType", docType);

      const res = await fetch("/api/kyc/upload-document", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "File upload failed. Ensure format is PDF/JPG/PNG and size ≤ 10MB.");
        return;
      }

      setUploadedDocs((prev) => [
        ...prev.filter((d) => d.documentType !== docType),
        {
          id: data.document.id,
          documentType: data.document.documentType,
          fileName: data.document.fileName,
        },
      ]);
    } catch {
      setErrorMsg("Network error during document upload.");
    } finally {
      setUploadingType(null);
    }
  };

  // Step Validation & Navigation
  const validateCurrentStep = (targetStep: number): boolean => {
    setErrorMsg(null);

    if (step === 1) {
      if (!legalName.trim()) {
        setErrorMsg("Company Legal Registered Name is required.");
        return false;
      }
      const cleanPan = pan.trim().toUpperCase();
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(cleanPan)) {
        setErrorMsg("Valid 10-character Permanent Account Number (PAN) is required (e.g. ABCDE1234F).");
        return false;
      }
      if (gstin.trim() && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9][A-Z][0-9A-Z]$/.test(gstin.trim().toUpperCase())) {
        setErrorMsg("GSTIN must be 15 alphanumeric characters.");
        return false;
      }
      if (!addressLine1.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
        setErrorMsg("Complete registered office address is mandatory.");
        return false;
      }
    }

    if (step === 3 && targetStep > 3) {
      if (accountNumber.trim() && !ifscSwift.trim()) {
        setErrorMsg("IFSC or SWIFT/BIC code is required when providing bank account details.");
        return false;
      }
    }

    if (step === 7 && targetStep > 7) {
      const missingMandatory = MANDATORY_DOCS.filter(
        (docType) => !uploadedDocs.some((d) => d.documentType === docType)
      );
      if (missingMandatory.length > 0) {
        const missingLabels = missingMandatory.map((d) => KYC_DOCUMENT_LABELS[d] || d).slice(0, 2).join(", ");
        setErrorMsg(`Mandatory documents missing: ${missingLabels}. Please upload all required files before proceeding.`);
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep(step + 1)) {
      setStep((prev) => Math.min(prev + 1, 8));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setErrorMsg(null);
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Final Submit Handler
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!declarationAccepted) {
      setErrorMsg("You must accept the Statutory Certification & Undertaking before submitting.");
      return;
    }

    if (!declarantName.trim() || !declarantDesignation.trim()) {
      setErrorMsg("Authorized signatory full name and official designation are required.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = buildCurrentPayload(true);
      const res = await fetch("/api/kyc/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Submission failed. Please verify all sections.");
        setSubmitting(false);
        return;
      }

      router.push("/onboarding/kyc/status");
    } catch {
      setErrorMsg("Network error during final submission. Please retry.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#0F3D2E] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Loading Institutional Enrollment Dossier...
          </p>
        </div>
      </div>
    );
  }

  const STEPS_NAV = [
    { num: 1, title: "Entity Profile", sub: "Legal & Address" },
    { num: 2, title: "Business Nature", sub: "Turnover & Standing" },
    { num: 3, title: "Banking & Escrow", sub: "Settlement Account" },
    { num: 4, title: "UBO & Signatories", sub: "Ownership & Control" },
    { num: 5, title: "Registry & Portfolio", sub: "Verra, GS & Assets" },
    { num: 6, title: "Compliance & PEP", sub: "Statutory Declarations" },
    { num: 7, title: "Document Vault", sub: "Verification Dossier" },
    { num: 8, title: "Undertaking", sub: "Sign & Submit" },
  ];

  return (
    <main className="min-h-screen bg-[#F4F6F8] pb-24">
      {/* Official Government / National Carbon Market Header */}
      <div className="bg-[#0B251C] text-white border-b border-[#143E30] py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 font-bold text-lg flex items-center justify-center">
              PRΛN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800/60">
                  Form: PRAN-CDD-V1.2
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Indian Carbon Market & CBL Standards Due Diligence
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white">
                Participant Due Diligence & KYC Onboarding
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={draftSaving}
              className="bg-white/10 hover:bg-white/15 text-white border-white/20 text-xs h-9 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{draftSaving ? "Saving..." : "Save Draft"}</span>
            </Button>
            <div className="text-right hidden sm:block">
              <span className="text-[11px] text-slate-400 block">Logged In As:</span>
              <span className="text-xs font-semibold text-emerald-300">
                {userProfile?.email || "Participant"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Messages */}
        {saveSuccessMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Stepper Navigation Tabs (ICM Style) */}
        <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm mb-6 overflow-x-auto">
          <div className="flex items-center min-w-[760px] justify-between">
            {STEPS_NAV.map((s) => {
              const isActive = step === s.num;
              const isPast = step > s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => {
                    if (s.num < step || validateCurrentStep(s.num)) {
                      setStep(s.num);
                    }
                  }}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-left transition-all relative ${
                    isActive
                      ? "bg-[#0F3D2E] text-white shadow-sm"
                      : isPast
                      ? "hover:bg-slate-50 text-slate-700"
                      : "text-slate-400 opacity-80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isActive
                          ? "bg-emerald-400 text-[#0F3D2E]"
                          : isPast
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isPast ? "✓" : s.num}
                    </span>
                    <div className="truncate">
                      <p className="text-[11px] font-bold truncate leading-tight">{s.title}</p>
                      <p className={`text-[9px] truncate ${isActive ? "text-emerald-200" : "text-slate-400"}`}>
                        {s.sub}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Body Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* STEP 1: Entity Profile & Identification */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  <Building2 className="w-4 h-4 text-emerald-700" /> Section 1 — Entity Profile & Statutory Identification
                </div>
                <h2 className="text-xl font-bold text-slate-900">Corporate & Legal Identification</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Information required per Section 1 of the PRAN Due Diligence Form and ICM Non-Obligated Seller / Buyer framework.
                </p>
              </div>

              {/* Entity Category Selector */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Market Role Classification *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { val: "SELLER", label: "Non-Obligated Seller", desc: "Project Developer / Generator" },
                    { val: "BUYER", label: "Obligated / Voluntary Buyer", desc: "Corporate / Compliance Entity" },
                    { val: "TRADER_BROKER", label: "Market Trader / Broker", desc: "Intermediary / Liquidity Provider" },
                  ].map((cat) => (
                    <label
                      key={cat.val}
                      className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                        entityCategory === cat.val
                          ? "border-emerald-600 bg-white ring-1 ring-emerald-600"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="entityCategory"
                        value={cat.val}
                        checked={entityCategory === cat.val}
                        onChange={() => setEntityCategory(cat.val as any)}
                        className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <span className="block text-xs font-bold text-slate-900">{cat.label}</span>
                        <span className="block text-[10px] text-slate-500">{cat.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Legal Name of Company (as per Certificate of Incorporation / MCA) *
                  </label>
                  <Input
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    placeholder="e.g. GreenHorizon Renewable Technologies Private Limited"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Trade / Operating Name (if different)
                  </label>
                  <Input
                    value={tradeName}
                    onChange={(e) => setTradeName(e.target.value)}
                    placeholder="e.g. GreenHorizon Carbon"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Entity Constitution / Registration Type *
                  </label>
                  <select
                    value={registrationType}
                    onChange={(e) => setRegistrationType(e.target.value as RegistrationType)}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {REGISTRATION_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Permanent Account Number (PAN) of Entity *
                  </label>
                  <Input
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                  />
                  <p className="text-[10px] text-slate-400 mt-1">10-character alphanumeric PAN of the registered entity</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Goods & Services Tax Identification Number (GSTIN)
                  </label>
                  <Input
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="27ABCDE1234F1Z5"
                    maxLength={15}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Company Registration Number / CIN / LLPIN
                  </label>
                  <Input
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    placeholder="e.g. U40106MH2020PTC345678"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Date of Incorporation
                  </label>
                  <Input
                    type="date"
                    value={dateOfIncorporation}
                    onChange={(e) => setDateOfIncorporation(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Corporate Website URL
                  </label>
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://www.company.com"
                  />
                </div>
              </div>

              {/* Registered Address */}
              <div className="border-t border-slate-100 pt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Registered Office Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">Address Line 1 *</label>
                    <Input
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="Street address, building, premises"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">Address Line 2 (Optional)</label>
                    <Input
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="Suite, unit, floor"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">City *</label>
                    <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Mumbai" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">State / Province *</label>
                    <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="Maharashtra" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">PIN / Postal Code *</label>
                    <Input value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="400001" maxLength={10} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Country *</label>
                    <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="India" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Nature of Business & Commercial Standing */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  <Briefcase className="w-4 h-4 text-emerald-700" /> Section 2 — Nature of Business & Commercial Standing
                </div>
                <h2 className="text-xl font-bold text-slate-900">Operational & Commercial Scope</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Per PRAN KYC Form Section 2 and CBL Exhibit A (Sub-Section B & C).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Industry / Sector *
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {SECTORS.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Describe Primary Nature & Scope of Business Operations *
                  </label>
                  <textarea
                    rows={3}
                    value={businessScope}
                    onChange={(e) => setBusinessScope(e.target.value)}
                    placeholder="Provide description of core commercial activities, services offered, plant capacity, or carbon credit transaction scope..."
                    className="w-full p-3 rounded-md border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Last Financial Year Turnover
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={turnoverCurrency}
                      onChange={(e) => setTurnoverCurrency(e.target.value)}
                      className="w-24 h-10 px-2 rounded-md border border-slate-200 bg-white text-xs"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                    <Input
                      value={turnover}
                      onChange={(e) => setTurnover(e.target.value)}
                      placeholder="e.g. 50,00,00,000"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Approximate Number of Employees
                  </label>
                  <Input
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    placeholder="e.g. 150"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Customer Source of Funds (Xpansiv CBL Rule)
                  </label>
                  <select
                    value={sourceOfFunds}
                    onChange={(e) => setSourceOfFunds(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-xs"
                  >
                    <option value="OPERATIONAL">Operational Proceeds / Sales Revenue</option>
                    <option value="INVESTOR">Equity / Venture Capital / Shareholder Loans</option>
                    <option value="OTHER">Other Source</option>
                  </select>
                </div>

                {sourceOfFunds !== "OPERATIONAL" && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Source of Funds Description
                    </label>
                    <Input
                      value={sourceOfFundsDesc}
                      onChange={(e) => setSourceOfFundsDesc(e.target.value)}
                      placeholder="Specify commercial or investor source of funds"
                    />
                  </div>
                )}
              </div>

              {/* Publicly Traded & Regulated Status (CBL Exhibit A) */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Publicly Traded / Regulated Entity Status (CBL Exhibit A, Sub-Section C)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPubliclyTraded}
                        onChange={(e) => setIsPubliclyTraded(e.target.checked)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Is Company listed on a recognized stock exchange (e.g. NSE / BSE / LSE)?</span>
                    </label>
                    {isPubliclyTraded && (
                      <Input
                        value={stockExchangeCode}
                        onChange={(e) => setStockExchangeCode(e.target.value)}
                        placeholder="Provide stock exchange and ticker code (e.g. NSE: GREEN)"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isRegulated}
                        onChange={(e) => setIsRegulated(e.target.checked)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Is Company licensed / regulated by SEBI, RBI, FCA, or statutory regulator?</span>
                    </label>
                    {isRegulated && (
                      <Input
                        value={regulatorName}
                        onChange={(e) => setRegulatorName(e.target.value)}
                        placeholder="Provide regulator name and registration/license number"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Banking & Escrow Settlement */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  <Landmark className="w-4 h-4 text-emerald-700" /> Section 3 — Banking & Commercial Settlement Information
                </div>
                <h2 className="text-xl font-bold text-slate-900">Commercial Bank Account Details</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Designated account for carbon credit escrow payouts, trading settlements, and invoice processing.
                </p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Escrow Security Requirement:</strong> Bank account name must strictly match the legal entity name. Third-party disbursements are strictly prohibited under anti-money laundering regulations.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Beneficiary Account Name (Name on Bank Account) *
                  </label>
                  <Input
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Must match registered corporate name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Bank Name *</label>
                  <Input
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g. HDFC Bank / State Bank of India / Standard Chartered"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Bank Account Number / IBAN *</label>
                  <Input
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Corporate account number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    IFSC Code (for India) / SWIFT / BIC Code (International) *
                  </label>
                  <Input
                    value={ifscSwift}
                    onChange={(e) => setIfscSwift(e.target.value.toUpperCase())}
                    placeholder="e.g. HDFC0000123 or HDFCINBB"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Account Currency</label>
                  <select
                    value={bankCurrency}
                    onChange={(e) => setBankCurrency(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-xs"
                  >
                    <option value="INR">Indian Rupee (INR)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Bank Branch & Address</label>
                  <Input
                    value={bankBranch}
                    onChange={(e) => setBankBranch(e.target.value)}
                    placeholder="Branch name and city"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Account Type</label>
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-xs"
                  >
                    <option value="Current">Current Account</option>
                    <option value="Escrow">Escrow / Custody Account</option>
                    <option value="Other">Other Institutional Account</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Beneficial Ownership, Personnel & Signatories */}
          {step === 4 && (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  <Users className="w-4 h-4 text-emerald-700" /> Section 4 — Beneficial Ownership & Authorized Personnel
                </div>
                <h2 className="text-xl font-bold text-slate-900">UBOs, Nodal Contacts & Signatories</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Mandated by PRAN KYC Form Sections 4, 5, 6 and CBL Market Operating Rules (Exhibits B & D).
                </p>
              </div>

              {/* Subsection A: UBOs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      A. Ultimate Beneficial Owners (UBOs)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      List all natural persons who ultimately own or control ≥ 25% of the entity’s equity / voting shares.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setUbos([
                        ...ubos,
                        { fullName: "", nationality: "India", idType: "PAN", idNumber: "", percentageOwnership: "" },
                      ])
                    }
                    className="h-8 text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add UBO
                  </Button>
                </div>

                {!noNaturalUbo ? (
                  <div className="space-y-3">
                    {ubos.map((ubo, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">Full Legal Name *</label>
                          <Input
                            value={ubo.fullName}
                            onChange={(e) => {
                              const newUbos = [...ubos];
                              newUbos[index].fullName = e.target.value;
                              setUbos(newUbos);
                            }}
                            placeholder="Full Name"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">Nationality *</label>
                          <Input
                            value={ubo.nationality}
                            onChange={(e) => {
                              const newUbos = [...ubos];
                              newUbos[index].nationality = e.target.value;
                              setUbos(newUbos);
                            }}
                            placeholder="India"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">ID (PAN / Passport) *</label>
                          <Input
                            value={ubo.idNumber}
                            onChange={(e) => {
                              const newUbos = [...ubos];
                              newUbos[index].idNumber = e.target.value;
                              setUbos(newUbos);
                            }}
                            placeholder="PAN / Passport"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <label className="block text-[11px] font-medium text-slate-600 mb-1">% Ownership *</label>
                            <Input
                              value={ubo.percentageOwnership}
                              onChange={(e) => {
                                const newUbos = [...ubos];
                                newUbos[index].percentageOwnership = e.target.value;
                                setUbos(newUbos);
                              }}
                              placeholder="e.g. 51"
                            />
                          </div>
                          {ubos.length > 1 && (
                            <button
                              type="button"
                              onClick={() => setUbos(ubos.filter((_, i) => i !== index))}
                              className="h-10 px-2.5 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      UBO Exemption Reason *
                    </label>
                    <Input
                      value={uboExemptionReason}
                      onChange={(e) => setUboExemptionReason(e.target.value)}
                      placeholder="e.g. Entity is 100% government-owned PSU / Listed on National Stock Exchange"
                    />
                  </div>
                )}

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={noNaturalUbo}
                    onChange={(e) => setNoNaturalUbo(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>
                    No natural person holds ≥ 25% ownership (Company is listed, PSU, non-profit, or widely held).
                  </span>
                </label>
              </div>

              {/* Subsection B: Key Contacts */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  B. Designated Key Contacts (Nodal Officers)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Front Office */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-emerald-800 block">
                      Primary Nodal Contact (Front Office / Commercial)
                    </span>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Contact Name *</label>
                      <Input value={frontName} onChange={(e) => setFrontName(e.target.value)} placeholder="Full Name" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Designation *</label>
                      <Input
                        value={frontDesignation}
                        onChange={(e) => setFrontDesignation(e.target.value)}
                        placeholder="e.g. Managing Director / Head of Carbon"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Phone Number *</label>
                      <Input value={frontPhone} onChange={(e) => setFrontPhone(e.target.value)} placeholder="+91 9876543210" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Email Address *</label>
                      <Input value={frontEmail} onChange={(e) => setFrontEmail(e.target.value)} placeholder="nodal@company.com" />
                    </div>
                  </div>

                  {/* Back Office */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-700 block">
                      Operations / Settlements Contact (Back Office)
                    </span>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Contact Name</label>
                      <Input value={backName} onChange={(e) => setBackName(e.target.value)} placeholder="Full Name" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Designation</label>
                      <Input
                        value={backDesignation}
                        onChange={(e) => setBackDesignation(e.target.value)}
                        placeholder="e.g. Operations Manager / CFO"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Phone Number</label>
                      <Input value={backPhone} onChange={(e) => setBackPhone(e.target.value)} placeholder="+91 9876543210" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Email Address</label>
                      <Input value={backEmail} onChange={(e) => setBackEmail(e.target.value)} placeholder="settlements@company.com" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subsection C: Authorized Signatories */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      C. Authorized Corporate Signatories
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Personnel authorized by Board Resolution / Power of Attorney to execute agreements and transactions.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSignatories([
                        ...signatories,
                        { fullName: "", designation: "Director", nationality: "India", idType: "PAN", idNumber: "", signingAuthority: "Solo" },
                      ])
                    }
                    className="h-8 text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Signatory
                  </Button>
                </div>

                <div className="space-y-3">
                  {signatories.map((sig, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-6 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Signatory Full Name *</label>
                        <Input
                          value={sig.fullName}
                          onChange={(e) => {
                            const newSig = [...signatories];
                            newSig[idx].fullName = e.target.value;
                            setSignatories(newSig);
                          }}
                          placeholder="Full Name"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Designation *</label>
                        <Input
                          value={sig.designation}
                          onChange={(e) => {
                            const newSig = [...signatories];
                            newSig[idx].designation = e.target.value;
                            setSignatories(newSig);
                          }}
                          placeholder="Director / Partner"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">ID (PAN / Passport) *</label>
                        <Input
                          value={sig.idNumber}
                          onChange={(e) => {
                            const newSig = [...signatories];
                            newSig[idx].idNumber = e.target.value;
                            setSignatories(newSig);
                          }}
                          placeholder="ID Number"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Authority *</label>
                        <select
                          value={sig.signingAuthority}
                          onChange={(e) => {
                            const newSig = [...signatories];
                            newSig[idx].signingAuthority = e.target.value;
                            setSignatories(newSig);
                          }}
                          className="w-full h-10 px-2 rounded-md border border-slate-200 bg-white text-xs"
                        >
                          <option value="Solo">Solo Signing</option>
                          <option value="Joint">Joint Signing</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        {signatories.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setSignatories(signatories.filter((_, i) => i !== idx))}
                            className="text-red-600 hover:text-red-700 h-10 w-full"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Carbon Registry Accounts & Project Details */}
          {step === 5 && (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  <Layers className="w-4 h-4 text-emerald-700" /> Section 5 — Carbon Registry & Project Portfolio Details
                </div>
                <h2 className="text-xl font-bold text-slate-900">Registry Accounts & Carbon Assets</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Modeled on Xpansiv CBL Exhibit E (Voluntary Carbon Registries) & ICM Project Formulation guidelines.
                </p>
              </div>

              {/* Subsection A: Linked Registries */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      A. Linked Registry Accounts (CBL Exhibit E)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Connect your accounts with voluntary and compliance registries for transfer & retirement verification.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedRegistries([
                        ...selectedRegistries,
                        { registry: REGISTRY_OPTIONS[0], accountName: legalName || "", accountNumber: "", authorizedRep: frontName || "" },
                      ])
                    }
                    className="h-8 text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Link Registry Account
                  </Button>
                </div>

                {selectedRegistries.length === 0 ? (
                  <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
                    <p>No registry account linked yet. Click &ldquo;Link Registry Account&rdquo; above to connect Verra, Gold Standard, ICR, or I-REC.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedRegistries.map((reg, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">Registry Standard *</label>
                          <select
                            value={reg.registry}
                            onChange={(e) => {
                              const newRegs = [...selectedRegistries];
                              newRegs[idx].registry = e.target.value;
                              setSelectedRegistries(newRegs);
                            }}
                            className="w-full h-10 px-2 rounded-md border border-slate-200 bg-white text-xs"
                          >
                            {REGISTRY_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">Account Title / Holder *</label>
                          <Input
                            value={reg.accountName}
                            onChange={(e) => {
                              const newRegs = [...selectedRegistries];
                              newRegs[idx].accountName = e.target.value;
                              setSelectedRegistries(newRegs);
                            }}
                            placeholder="Account Holder Name"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">Registry Account ID / Number *</label>
                          <Input
                            value={reg.accountNumber}
                            onChange={(e) => {
                              const newRegs = [...selectedRegistries];
                              newRegs[idx].accountNumber = e.target.value;
                              setSelectedRegistries(newRegs);
                            }}
                            placeholder="e.g. 100000000001"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <label className="block text-[11px] font-medium text-slate-600 mb-1">Authorized Representative</label>
                            <Input
                              value={reg.authorizedRep}
                              onChange={(e) => {
                                const newRegs = [...selectedRegistries];
                                newRegs[idx].authorizedRep = e.target.value;
                                setSelectedRegistries(newRegs);
                              }}
                              placeholder="Representative Name"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedRegistries(selectedRegistries.filter((_, i) => i !== idx))}
                            className="h-10 px-2 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subsection B: Seller Project Submission (For Non-Obligated Sellers) */}
              {entityCategory === "SELLER" && (
                <div className="space-y-4 border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-2">
                    <Trees className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      B. Primary Carbon Project Submission (For Sellers)
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Submit the initial project profile to list for pre-clearance and escrow trading on PRAN.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">Project Name / Title *</label>
                      <Input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="e.g. 50 MW Bundled Grid-Connected Wind Power Project in Rajasthan"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Issuing Registry Standard *</label>
                      <select
                        value={projectRegistry}
                        onChange={(e) => setProjectRegistry(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-xs"
                      >
                        {REGISTRY_OPTIONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Registry Project ID *</label>
                      <Input
                        value={registryProjectId}
                        onChange={(e) => setRegistryProjectId(e.target.value)}
                        placeholder="e.g. VCS 1457 / GS 1525 / ICR 306"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Methodology Applied</label>
                      <Input
                        value={projectMethodology}
                        onChange={(e) => setProjectMethodology(e.target.value)}
                        placeholder="e.g. ACM0002, VM0007, AR-ACM0003"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Project Sector / Category</label>
                      <Input
                        value={projectSector}
                        onChange={(e) => setProjectSector(e.target.value)}
                        placeholder="e.g. Renewable Energy / Afforestation"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Project Geographic Location</label>
                      <Input
                        value={projectLocation}
                        onChange={(e) => setProjectLocation(e.target.value)}
                        placeholder="State, District, Country (e.g. Rajasthan, India)"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Crediting Period</label>
                      <Input
                        value={creditingPeriod}
                        onChange={(e) => setCreditingPeriod(e.target.value)}
                        placeholder="e.g. 2021–2031 (10 Years Renewable)"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Estimated Annual Volume (tCO2e)</label>
                      <Input
                        value={estAnnualCredits}
                        onChange={(e) => setEstAnnualCredits(e.target.value)}
                        placeholder="e.g. 95,000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Available Vintages Offered</label>
                      <Input
                        value={vintageYears}
                        onChange={(e) => setVintageYears(e.target.value)}
                        placeholder="e.g. 2021, 2022, 2023"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Total Credits Available for Trade</label>
                      <Input
                        value={creditsOffered}
                        onChange={(e) => setCreditsOffered(e.target.value)}
                        placeholder="e.g. 250,000 tCO2e"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Regulatory Declarations & AML */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  <Scale className="w-4 h-4 text-emerald-700" /> Section 6 — Regulatory & Compliance Declarations
                </div>
                <h2 className="text-xl font-bold text-slate-900">Statutory Due Diligence & AML Declarations</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Compliance statements as required under Section 7 of PRAN KYC Form and CBL Exhibit C.
                </p>
              </div>

              <div className="space-y-4 divide-y divide-slate-100">
                {/* 1. Acting on behalf of another */}
                <div className="pt-4 first:pt-0 space-y-2">
                  <p className="text-xs font-bold text-slate-900">
                    1. Is the Company acting on behalf of another company, undisclosed principal, or third-party entity? *
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="actingOnBehalf"
                        checked={actingOnBehalf}
                        onChange={() => setActingOnBehalf(true)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="actingOnBehalf"
                        checked={!actingOnBehalf}
                        onChange={() => setActingOnBehalf(false)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {actingOnBehalf && (
                    <Input
                      value={actingOnBehalfDesc}
                      onChange={(e) => setActingOnBehalfDesc(e.target.value)}
                      placeholder="Please specify principal entity name and relationship details"
                    />
                  )}
                </div>

                {/* 2. PEPs */}
                <div className="pt-4 space-y-2">
                  <p className="text-xs font-bold text-slate-900">
                    2. Are Politically Exposed Persons (PEPs) involved in the ownership, governance, directorship, or authorized signatory roster? *
                  </p>
                  <p className="text-[11px] text-slate-500">
                    A PEP is defined as an individual who holds a prominent public function, government position, or close family/associate thereof.
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="pepInvolved"
                        checked={pepInvolved}
                        onChange={() => setPepInvolved(true)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="pepInvolved"
                        checked={!pepInvolved}
                        onChange={() => setPepInvolved(false)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {pepInvolved && (
                    <Input
                      value={pepDetails}
                      onChange={(e) => setPepDetails(e.target.value)}
                      placeholder="Please state PEP individual name, political position held, government agency, and relationship"
                    />
                  )}
                </div>

                {/* 3. Sanctions */}
                <div className="pt-4 space-y-2">
                  <p className="text-xs font-bold text-slate-900">
                    3. Is the Company, or any of its Directors, Shareholders, or Authorized Signatories, subject to any sanctions or restrictive measures? *
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="sanctionsSubject"
                        checked={sanctionsSubject}
                        onChange={() => setSanctionsSubject(true)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="sanctionsSubject"
                        checked={!sanctionsSubject}
                        onChange={() => setSanctionsSubject(false)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {sanctionsSubject && (
                    <Input
                      value={sanctionsDetails}
                      onChange={(e) => setSanctionsDetails(e.target.value)}
                      placeholder="Provide sanctions authority and resolution details"
                    />
                  )}
                </div>

                {/* 4. Legal Disputes / Insolvency */}
                <div className="pt-4 space-y-2">
                  <p className="text-xs font-bold text-slate-900">
                    4. Has the Company been involved in any material legal disputes, insolvency proceedings, or regulatory actions in the past 5 years? *
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="legalDisputes"
                        checked={legalDisputes}
                        onChange={() => setLegalDisputes(true)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="legalDisputes"
                        checked={!legalDisputes}
                        onChange={() => setLegalDisputes(false)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {legalDisputes && (
                    <Input
                      value={legalDisputesDetails}
                      onChange={(e) => setLegalDisputesDetails(e.target.value)}
                      placeholder="Please provide jurisdiction, dispute description, and current status"
                    />
                  )}
                </div>

                {/* 5. Related Party Transactions */}
                <div className="pt-4 space-y-2">
                  <p className="text-xs font-bold text-slate-900">
                    5. Does the Company have any related-party transactions or common ownership with other entities operating in the carbon credit sector? *
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="relatedParty"
                        checked={relatedParty}
                        onChange={() => setRelatedParty(true)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="relatedParty"
                        checked={!relatedParty}
                        onChange={() => setRelatedParty(false)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {relatedParty && (
                    <Input
                      value={relatedPartyDetails}
                      onChange={(e) => setRelatedPartyDetails(e.target.value)}
                      placeholder="Please specify related entity names and nature of common interest"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Supporting Documents Upload */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  <UploadCloud className="w-4 h-4 text-emerald-700" /> Section 7 — Supporting Verification Documentation
                </div>
                <h2 className="text-xl font-bold text-slate-900">Verification Document Vault</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Per Section 8 of PRAN KYC Form and CBL Exhibit G. Files are encrypted and stored in private Supabase Storage buckets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { type: "CERTIFICATE_OF_INCORPORATION", label: "1. Certificate of Incorporation / Registration Deed", mandatory: true },
                  { type: "BOARD_RESOLUTION", label: "2. Board Resolution / Power of Attorney authorizing Signatory", mandatory: true },
                  { type: "BANK_STATEMENT", label: "3. Recent Bank Statement (last 3 months) / Cancelled Cheque", mandatory: true },
                  { type: "PAN_CARD", label: "4. Permanent Account Number (PAN) Card of Entity", mandatory: true },
                  { type: "GST_CERTIFICATE", label: "5. GST Registration Certificate (or Tax Exemption Proof)", mandatory: true },
                  { type: "ADDRESS_PROOF", label: "6. Proof of Registered Office Address (Utility Bill / Lease)", mandatory: true },
                  { type: "AUTHORIZED_SIGNATORY_ID", label: "7. Government ID Proof of Authorized Signatories (PAN/Passport)", mandatory: true },
                  { type: "SHAREHOLDERS_UBO_LIST", label: "8. List of Shareholders and UBOs with ID Proof", mandatory: false },
                  { type: "REGISTRY_CERTIFICATE", label: "9. Carbon / REC Registry Account Proof (For Sellers)", mandatory: entityCategory === "SELLER" },
                  { type: "FINANCIAL_STATEMENTS", label: "10. Audited Financial Statements (Last 2 Years)", mandatory: false },
                  { type: "BUSINESS_LICENSE", label: "11. Trade License / MSME Certificate / Sectoral Approvals", mandatory: false },
                  { type: "OTHER", label: "12. Supplementary Corporate Profile / Power of Attorney", mandatory: false },
                ].map((doc) => {
                  const uploaded = uploadedDocs.find((d) => d.documentType === doc.type);
                  const isUploading = uploadingType === doc.type;

                  return (
                    <div
                      key={doc.type}
                      className={`p-4 rounded-xl border transition-all ${
                        uploaded
                          ? "bg-emerald-50/60 border-emerald-300"
                          : doc.mandatory
                          ? "bg-white border-slate-200"
                          : "bg-slate-50/70 border-slate-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block leading-tight">
                            {doc.label}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {doc.mandatory ? (
                              <span className="text-red-600 font-semibold">• Mandatory Document</span>
                            ) : (
                              "• Supporting Document"
                            )}
                          </span>
                        </div>
                        {uploaded && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> UPLOADED
                          </span>
                        )}
                      </div>

                      {uploaded ? (
                        <div className="flex items-center justify-between text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-emerald-200 mt-2">
                          <span className="truncate max-w-[200px] font-medium">{uploaded.fileName}</span>
                          <label className="cursor-pointer text-emerald-700 hover:underline font-semibold text-[11px]">
                            Replace
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, doc.type as KycDocumentType)}
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <label className="flex items-center justify-center gap-2 w-full py-2.5 px-3 border border-dashed border-slate-300 rounded-lg text-xs font-medium text-slate-600 hover:border-emerald-600 hover:text-emerald-700 cursor-pointer bg-white transition-colors">
                            <UploadCloud className="w-4 h-4" />
                            <span>{isUploading ? "Encrypting & Uploading..." : "Choose File (PDF/JPG ≤ 10MB)"}</span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              disabled={isUploading}
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, doc.type as KycDocumentType)}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 8: Review & Statutory Undertaking */}
          {step === 8 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  <BadgeCheck className="w-4 h-4 text-emerald-700" /> Section 8 — Statutory Certification & Final Submission
                </div>
                <h2 className="text-xl font-bold text-slate-900">Declaration & Authorization (Section 9)</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Legally binding declaration per Section 9 of the PRAN Due Diligence Form & CBL Market Participant Agreement.
                </p>
              </div>

              {/* Dossier Summary Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 uppercase tracking-wider block">
                  Dossier Summary Overview
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-700 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Entity Legal Name</span>
                    <span className="font-semibold">{legalName || "Not set"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Entity PAN</span>
                    <span className="font-semibold">{pan || "Not set"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Market Category</span>
                    <span className="font-semibold">{entityCategory}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Documents Uploaded</span>
                    <span className="font-semibold text-emerald-700">{uploadedDocs.length} Documents</span>
                  </div>
                </div>
              </div>

              {/* Statutory Undertaking Text */}
              <div className="p-5 bg-white rounded-xl border border-slate-300 text-xs text-slate-700 space-y-3 leading-relaxed max-h-60 overflow-y-auto">
                <p className="font-bold text-slate-900">I / We hereby certify, confirm, and declare that:</p>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 text-xs">
                  <li>
                    All information, particulars, and documentation provided in this KYC Form and attached hereto are true, authentic, accurate, and complete to the best of our knowledge and belief.
                  </li>
                  <li>
                    We undertake to notify PRAN immediately of any material alteration or change to the information provided in this application, including any change in beneficial ownership, directorship, or sanctions status.
                  </li>
                  <li>
                    PRAN is authorized to verify the veracity of these particulars through competent authorities, banks, MCA, UIDAI, or registry administrators, and may share this information with regulatory authorities where legally required under Indian Carbon Market and AML regulations.
                  </li>
                  <li>
                    The Applicant Company is not engaged in any unlawful, fraudulent, or sanctioned activity prohibited under Indian or international law, and operates in strict accordance with the Carbon Credit Trading Scheme (CCTS) and voluntary carbon registry standards.
                  </li>
                  <li>
                    PRAN reserves the statutory right to request supplementary documentation, freeze escrow accounts, or terminate market participation at its sole discretion should any information be discovered to be false, forged, or misleading.
                  </li>
                </ol>
              </div>

              {/* Signatory Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Authorized Signatory Full Name (Printed) *
                  </label>
                  <Input
                    value={declarantName}
                    onChange={(e) => setDeclarantName(e.target.value)}
                    placeholder="Full Legal Name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Designation / Title *
                  </label>
                  <Input
                    value={declarantDesignation}
                    onChange={(e) => setDeclarantDesignation(e.target.value)}
                    placeholder="e.g. Director / Authorized Signatory"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Date of Declaration *
                  </label>
                  <Input
                    type="date"
                    value={declarationDate}
                    onChange={(e) => setDeclarationDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={declarationAccepted}
                    onChange={(e) => setDeclarationAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-emerald-950 font-medium leading-relaxed">
                    I formally confirm my authorization to execute this statutory undertaking on behalf of the registered entity. I agree to be bound by the PRAN Market Operating Rules, Escrow Settlement Protocols, and Indian Carbon Market regulatory standards.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Wizard Controls Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 mt-8 pt-6">
            <div>
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  className="text-xs h-10 px-4 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Section</span>
                </Button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handleSaveDraft}
                disabled={draftSaving}
                className="text-xs h-10 px-3 text-slate-600 hover:text-slate-900"
              >
                <Save className="w-3.5 h-3.5 mr-1" />
                <span>{draftSaving ? "Saving..." : "Save Draft"}</span>
              </Button>

              {step < 8 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#0F3D2E] hover:bg-[#155A44] text-white text-xs h-10 px-5 flex items-center gap-1.5 font-semibold"
                >
                  <span>Continue to Section {step + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={submitting}
                  className="bg-[#0F3D2E] hover:bg-[#155A44] text-white text-xs h-11 px-6 flex items-center gap-2 font-bold shadow-sm"
                >
                  {submitting ? (
                    <span>Submitting Dossier...</span>
                  ) : (
                    <>
                      <span>Submit Official Due Diligence Dossier</span>
                      <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
