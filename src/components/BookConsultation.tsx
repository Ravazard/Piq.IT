import React, { useState, useRef, useEffect } from 'react';

const SERVICES = [
  'Design Studio',
  'Sourcing Hub',
  'Content Lab',
  'Commerce Grid',
];

export interface BookConsultationProps {
  isModal?: boolean;
  onClose?: () => void;
  defaultService?: string;
}

export const BookConsultation: React.FC<BookConsultationProps> = ({
  isModal = false,
  onClose,
  defaultService = 'Design Studio',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [isVisible, setIsVisible] = useState(isModal);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState(defaultService);
  const [message, setMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    message?: boolean;
  }>({});

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setSelectedService(defaultService);
  }, [defaultService]);

  const validateName = (val: string): string | undefined => {
    if (!val.trim()) {
      return 'Please enter your name';
    }
    return undefined;
  };

  const validateEmail = (val: string): string | undefined => {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Please enter your work email';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid work email address';
    }
    return undefined;
  };

  const validateMessage = (val: string): string | undefined => {
    if (!val.trim()) {
      return 'Please enter your message';
    }
    return undefined;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateName(val) }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMessage(val);
    if (touched.message) {
      setErrors((prev) => ({ ...prev, message: validateMessage(val) }));
    }
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'name') {
      setErrors((prev) => ({ ...prev, name: validateName(name) }));
    } else if (field === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else if (field === 'message') {
      setErrors((prev) => ({ ...prev, message: validateMessage(message) }));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsNarrowScreen(window.innerWidth < 1040);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isModal) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isModal]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown-container]')) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  /*
   * ==============================================================================================
   * BACKEND INTEGRATION & DEPLOYMENT NOTICE:
   * This consultation form handles client-side validation, error handling, and visual confirmation.
   * To actually receive user consultation inquiries, the deployment team MUST connect an email service
   * or SMTP provider (e.g., EmailJS, Resend, SendGrid, AWS SES, or a custom backend webhook/API endpoint).
   * Without connecting an email service, inquiries will NOT be delivered.
   *
   * SECURITY WARNING - SECRETS MANAGEMENT:
   * NEVER hardcode email service API keys, SMTP credentials, or secret tokens directly in this codebase.
   * The person managing deployment must store all service keys and credentials exclusively in .env
   * (or via the production hosting platform's environment variables settings, e.g. Vercel / Netlify / Cloudflare).
   * ==============================================================================================
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const messageErr = validateMessage(message);

    setTouched({ name: true, email: true, message: true });
    setErrors({
      name: nameErr,
      email: emailErr,
      message: messageErr,
    });

    if (nameErr) {
      nameInputRef.current?.focus();
      return;
    }
    if (emailErr) {
      emailInputRef.current?.focus();
      return;
    }
    if (messageErr) {
      messageInputRef.current?.focus();
      return;
    }

    setIsSubmitted(true);
    if (submitTimerRef.current) {
      clearTimeout(submitTimerRef.current);
    }
    submitTimerRef.current = setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      setSelectedService(defaultService);
      setErrors({});
      setTouched({});
      if (isModal && onClose) {
        onClose();
      }
    }, 2500);
  };

  const isStacked = isMobile || (isModal && isNarrowScreen);
  const SectionTag = isModal ? 'div' : 'section';

  return (
    <SectionTag
      ref={sectionRef as any}
      id={isModal ? undefined : 'book-consultation'}
      style={{
        backgroundImage:
          'linear-gradient(128.96585952086588deg, rgb(54, 21, 20) 16.019%, rgb(176, 59, 39) 98.638%)',
        padding: isModal
          ? isMobile
            ? '36px 20px 40px 20px'
            : '44px 48px'
          : isMobile
          ? '60px 20px 80px 20px'
          : '60px 71px',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: isModal ? '24px' : undefined,
      }}
    >
      <div
        style={{
          maxWidth: isModal ? '1040px' : '1254px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isStacked ? 'center' : 'center',
          gap: isModal ? (isStacked ? '30px' : '40px') : isMobile ? '36px' : '40px',
          flexDirection: isStacked ? 'column' : 'row',
          width: '100%',
        }}
      >
        <div
          style={{
            flex: isStacked ? 'none' : isModal ? '1 1 420px' : '1 1 500px',
            maxWidth: isStacked ? '100%' : isModal ? '460px' : '620px',
            width: isStacked ? '100%' : 'auto',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition:
              'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.1s ease',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: isMobile || isModal ? '38px' : '49px',
              padding: isMobile || isModal ? '0 24px' : '0 32px',
              border: '1px solid #c5422b',
              borderRadius: '36px',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isMobile || isModal ? '16px' : '24px',
              fontWeight: 600,
              letterSpacing: isMobile || isModal ? '-1px' : '-1.5px',
              color: '#c5422b',
              marginBottom: isModal ? '18px' : isMobile ? '20px' : '37px',
              boxSizing: 'border-box',
              backgroundColor: 'transparent',
            }}
          >
            Talk to Us
          </div>

          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isModal
                ? isMobile
                  ? 'clamp(28px, 7vw, 36px)'
                  : '40px'
                : isMobile
                ? 'clamp(32px, 8vw, 44px)'
                : '60px',
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: isMobile ? '-1.5px' : '-2.3321px',
              color: '#ffffff',
              margin: isModal ? '0 0 18px 0' : isMobile ? '0 0 20px 0' : '0 0 40px 0',
            }}
          >
            <span style={{ color: '#c5422b' }}>Build </span>What’s Next <br />
            for Your <span style={{ color: '#c5422b' }}>Brand</span>
          </h2>

          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isModal
                ? isMobile
                  ? '15px'
                  : '17px'
                : isMobile
                ? '16px'
                : '24px',
              fontWeight: 300,
              lineHeight: 1.3,
              letterSpacing: isMobile ? '-0.5px' : '-1.5px',
              color: '#ffffff',
              maxWidth: isModal ? '440px' : isMobile ? '100%' : '520px',
              margin: 0,
              opacity: 0.95,
            }}
          >
            Tell us where you want to go. We’ll help you find the right path to build, launch and scale your brand
          </p>
        </div>

        <div
          style={{
            flex: isStacked ? 'none' : isModal ? '0 0 490px' : '1 1 480px',
            maxWidth: isStacked ? '100%' : isModal ? '500px' : '525px',
            width: '100%',
            backgroundColor: '#fff9f0',
            borderRadius: '20px',
            padding: isModal
              ? isMobile
                ? '24px 20px 28px'
                : '32px 36px 30px'
              : isMobile
              ? '24px 20px 28px'
              : '40px 42px 35px',
            boxSizing: 'border-box',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible ? 1 : 0,
            transition:
              'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, opacity 1.1s ease 0.15s',
          }}
        >
          {isSubmitted ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: isModal ? '320px' : '380px',
                textAlign: 'center',
                padding: '20px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#c5422b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#492020',
                  margin: '0 0 12px 0',
                }}
              >
                Scale Plan Requested!
              </h3>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '18px',
                  fontWeight: 300,
                  color: 'rgba(0,0,0,0.7)',
                  maxWidth: '400px',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Thank you! Our retail growth team will review your details and
                reach out shortly with your tailored next step.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
              <div style={{ marginBottom: '14px' }}>
                <input
                  ref={nameInputRef}
                  type="text"
                  placeholder="Name*"
                  value={name}
                  onChange={handleNameChange}
                  style={{
                    width: '100%',
                    height: isModal
                      ? isMobile
                        ? '46px'
                        : '52px'
                      : isMobile
                      ? '46px'
                      : '58px',
                    backgroundColor: '#d5d5d5',
                    borderRadius: '9px',
                    border:
                      touched.name && errors.name
                        ? '1px solid #c5422b'
                        : '1px solid transparent',
                    outline: 'none',
                    padding: '0 16px',
                    boxSizing: 'border-box',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: isModal
                      ? isMobile
                        ? '15px'
                        : '16px'
                      : isMobile
                      ? '15px'
                      : '17px',
                    fontWeight: 300,
                    letterSpacing: '-1px',
                    color: '#000000',
                    transition:
                      'border-color 0.2s ease, background-color 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#c5422b';
                    e.currentTarget.style.backgroundColor = '#e0e0e0';
                  }}
                  onBlur={(e) => {
                    handleBlur('name');
                    e.currentTarget.style.borderColor =
                      touched.name && errors.name
                        ? '#c5422b'
                        : 'transparent';
                    e.currentTarget.style.backgroundColor = '#d5d5d5';
                  }}
                />
                {touched.name && errors.name && (
                  <div
                    style={{
                      color: '#c5422b',
                      fontSize: '12px',
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      marginTop: '4px',
                      marginLeft: '4px',
                      textAlign: 'left',
                    }}
                  >
                    {errors.name}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '14px' }}>
                <input
                  ref={emailInputRef}
                  type="email"
                  placeholder="Work Email*"
                  value={email}
                  onChange={handleEmailChange}
                  style={{
                    width: '100%',
                    height: isModal
                      ? isMobile
                        ? '46px'
                        : '52px'
                      : isMobile
                      ? '46px'
                      : '58px',
                    backgroundColor: '#d5d5d5',
                    borderRadius: '9px',
                    border:
                      touched.email && errors.email
                        ? '1px solid #c5422b'
                        : '1px solid transparent',
                    outline: 'none',
                    padding: '0 16px',
                    boxSizing: 'border-box',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: isModal
                      ? isMobile
                        ? '15px'
                        : '16px'
                      : isMobile
                      ? '15px'
                      : '17px',
                    fontWeight: 300,
                    letterSpacing: '-1px',
                    color: '#000000',
                    transition:
                      'border-color 0.2s ease, background-color 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#c5422b';
                    e.currentTarget.style.backgroundColor = '#e0e0e0';
                  }}
                  onBlur={(e) => {
                    handleBlur('email');
                    e.currentTarget.style.borderColor =
                      touched.email && errors.email
                        ? '#c5422b'
                        : 'transparent';
                    e.currentTarget.style.backgroundColor = '#d5d5d5';
                  }}
                />
                {touched.email && errors.email && (
                  <div
                    style={{
                      color: '#c5422b',
                      fontSize: '12px',
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      marginTop: '4px',
                      marginLeft: '4px',
                      textAlign: 'left',
                    }}
                  >
                    {errors.email}
                  </div>
                )}
              </div>

              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: isModal
                    ? isMobile
                      ? '14px'
                      : '16px'
                    : isMobile
                    ? '14px'
                    : '17px',
                  fontWeight: 300,
                  letterSpacing: '-0.8px',
                  color: '#000000',
                  marginBottom: '10px',
                  marginTop: '10px',
                  textAlign: 'left',
                }}
              >
                What can we help you with?
              </div>

              <div
                data-dropdown-container
                style={{
                  position: 'relative',
                  marginBottom: '14px',
                }}
              >
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    width: '100%',
                    height: isModal
                      ? isMobile
                        ? '46px'
                        : '52px'
                      : isMobile
                      ? '46px'
                      : '58px',
                    backgroundColor: '#d5d5d5',
                    borderRadius: '9px',
                    padding: '0 16px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none',
                    border: isDropdownOpen
                      ? '1px solid #c5422b'
                      : '1px solid transparent',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: isModal
                        ? isMobile
                          ? '15px'
                          : '16px'
                        : isMobile
                        ? '15px'
                        : '17px',
                      fontWeight: 300,
                      letterSpacing: '-1px',
                      color: '#000000',
                    }}
                  >
                    {selectedService}
                  </span>

                  <svg
                    width="16"
                    height="11"
                    viewBox="0 0 18 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: isDropdownOpen
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                    }}
                  >
                    <path
                      d="M0.5 0.5L9.5 12.5L17.5 0.5"
                      stroke="black"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {isDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: isModal
                        ? isMobile
                          ? '52px'
                          : '58px'
                        : isMobile
                        ? '52px'
                        : '64px',
                      left: 0,
                      width: '100%',
                      backgroundColor: '#ffffff',
                      borderRadius: '9px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                      zIndex: 100,
                      overflow: 'hidden',
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    {SERVICES.map((service) => (
                      <div
                        key={service}
                        onClick={() => {
                          setSelectedService(service);
                          setIsDropdownOpen(false);
                        }}
                        style={{
                          padding: isMobile ? '10px 16px' : '14px 20px',
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: isMobile ? '14px' : '16px',
                          fontWeight: service === selectedService ? 600 : 300,
                          color:
                            service === selectedService ? '#c5422b' : '#000000',
                          backgroundColor:
                            service === selectedService
                              ? 'rgba(197, 66, 43, 0.08)'
                              : 'transparent',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                        }}
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <textarea
                  ref={messageInputRef}
                  placeholder="Message*"
                  rows={3}
                  value={message}
                  onChange={handleMessageChange}
                  style={{
                    width: '100%',
                    height: isModal
                      ? isMobile
                        ? '76px'
                        : '84px'
                      : isMobile
                      ? '76px'
                      : '92px',
                    backgroundColor: '#d5d5d5',
                    borderRadius: '9px',
                    border:
                      touched.message && errors.message
                        ? '1px solid #c5422b'
                        : '1px solid transparent',
                    outline: 'none',
                    padding: isMobile ? '12px 16px' : '14px 18px',
                    boxSizing: 'border-box',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: isModal
                      ? isMobile
                        ? '15px'
                        : '16px'
                      : isMobile
                      ? '15px'
                      : '17px',
                    fontWeight: 300,
                    letterSpacing: '-1px',
                    color: '#000000',
                    resize: 'none',
                    transition:
                      'border-color 0.2s ease, background-color 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#c5422b';
                    e.currentTarget.style.backgroundColor = '#e0e0e0';
                  }}
                  onBlur={(e) => {
                    handleBlur('message');
                    e.currentTarget.style.borderColor =
                      touched.message && errors.message
                        ? '#c5422b'
                        : 'transparent';
                    e.currentTarget.style.backgroundColor = '#d5d5d5';
                  }}
                />
                {touched.message && errors.message && (
                  <div
                    style={{
                      color: '#c5422b',
                      fontSize: '12px',
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      marginTop: '4px',
                      marginLeft: '4px',
                      textAlign: 'left',
                    }}
                  >
                    {errors.message}
                  </div>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: '4px',
                }}
              >
                {Object.values(errors).some(Boolean) &&
                  Object.keys(touched).length > 0 && (
                    <div
                      style={{
                        color: '#c5422b',
                        fontSize: '12px',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                        textAlign: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      Please complete the required fields above
                    </div>
                  )}

                {/* 
                  ==============================================================================
                  DEPLOYMENT NOTE FOR "GET STARTED":
                  To receive consultation inquiries submitted here, connect this form to an SMTP 
                  server or transactional email provider (such as EmailJS, Resend, SendGrid, or AWS SES).
                  WITHOUT AN EMAIL SERVICE CONNECTED, INQUIRIES WILL NOT BE DELIVERED.
                  
                  CRITICAL SECURITY NOTICE:
                  The deployment engineer must handle all secrets carefully. NEVER hardcode email
                  service API keys, tokens, or credentials in this file or any part of the codebase.
                  Always store secrets in .env (or your cloud deployment environment variables).
                  ==============================================================================
                */}
                <button
                  type="submit"
                  style={{
                    width: isMobile ? '100%' : '204px',
                    height: isModal
                      ? isMobile
                        ? '44px'
                        : '48px'
                      : isMobile
                      ? '44px'
                      : '48px',
                    backgroundColor: '#c5422b',
                    borderRadius: '42px',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    opacity: 1,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: isModal
                      ? isMobile
                        ? '14px'
                        : '15px'
                      : isMobile
                      ? '14px'
                      : '15px',
                    fontWeight: 600,
                    color: '#ffffff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap',
                    transition:
                      'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
                    boxShadow: '0 6px 20px rgba(197, 66, 43, 0.35)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = '#b03b27';
                    e.currentTarget.style.boxShadow =
                      '0 10px 25px rgba(197, 66, 43, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = '#c5422b';
                    e.currentTarget.style.boxShadow =
                      '0 6px 20px rgba(197, 66, 43, 0.35)';
                  }}
                >
                  Get Started
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </SectionTag>
  );
};
