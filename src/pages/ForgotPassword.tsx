import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, KeyRound, CheckCircle, AlertCircle, Eye, EyeOff, Globe, Check, Sparkles } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

function ForgotPassword() {
  const navigate = useNavigate();
  const { lang, setLang, languageNames, availableLanguages } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  // Steps: 1=输入邮箱, 2=输入验证码, 3=重置密码, 4=成功
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation states
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // Countdown timer
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Pet guide
  const [petMessage, setPetMessage] = useState("别担心，我来帮你找回密码！");
  const [petMood, setPetMood] = useState<"happy" | "thinking" | "excited" | "sleepy">("happy");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && step === 2) {
      setCanResend(true);
    }
  }, [countdown, step]);

  const getPetEmoji = () => {
    switch (petMood) {
      case "happy": return "(◕‿◕)";
      case "thinking": return "( 🤔 )";
      case "excited": return "( ✧ω✧ )";
      case "sleepy": return "( ∙_∙ )zzZ";
      default: return "(◕‿◕)";
    }
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError("");
      return false;
    }
    if (email.includes(" ")) {
      setEmailError("邮箱不能包含空格");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("请输入有效的邮箱地址");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("");
      setPasswordStrength(0);
      return false;
    }
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10;
    setPasswordStrength(Math.min(strength, 100));

    if (password.length < 8) {
      setPasswordError("密码至少需要8个字符");
      return false;
    }
    if (password.includes(" ")) {
      setPasswordError("密码不能包含空格");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("密码必须包含小写字母");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("密码必须包含大写字母");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError("密码必须包含数字");
      return false;
    }
    
    setPasswordError("");
    return true;
  };

  const getStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength < 40) return "弱";
    if (passwordStrength < 70) return "中等";
    return "强";
  };

  // Generate random 6-digit code
  const generateCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCountdown(60);
    setCanResend(false);
    return newCode;
  };

  // Simulate sending email
  const handleSendCode = () => {
    if (!validateEmail(email)) {
      setPetMood("thinking");
      setPetMessage("请先输入正确的邮箱地址哦~");
      return;
    }

    const code = generateCode();
    // Simulate storing in localStorage (in real app, this would be sent via email)
    localStorage.setItem("resetCode", code);
    localStorage.setItem("resetEmail", email);
    
    setStep(2);
    setPetMood("excited");
    setPetMessage(`验证码已发送！模拟验证码：${code}（实际项目中会发送到邮箱）`);
  };

  const handleResendCode = () => {
    if (canResend) {
      handleSendCode();
      setPetMood("happy");
      setPetMessage("新的验证码已发送！");
    }
  };

  const handleVerifyCode = () => {
    if (!code) {
      setCodeError("请输入验证码");
      setPetMood("thinking");
      setPetMessage("验证码还没填呢~");
      return;
    }

    const storedCode = localStorage.getItem("resetCode");
    if (code === storedCode) {
      setStep(3);
      setCodeError("");
      setPetMood("excited");
      setPetMessage("验证成功！现在设置新密码吧！");
    } else {
      setCodeError("验证码错误，请重新输入");
      setPetMood("thinking");
      setPetMessage("验证码不对哦，再检查一下~");
    }
  };

  const handleResetPassword = () => {
    if (!validatePassword(newPassword)) {
      setPetMood("thinking");
      setPetMessage("密码格式不对哦，按要求设置吧~");
      return;
    }

    // Simulate storing new password
    localStorage.setItem("newPassword", newPassword);
    localStorage.removeItem("resetCode");
    localStorage.removeItem("resetEmail");
    
    setStep(4);
    setPetMood("excited");
    setPetMessage("密码重置成功！快去登录吧！");
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
      </div>

      {/* Back button */}
      <motion.button
        onClick={() => navigate("/login")}
        className="absolute top-6 left-6 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </motion.button>

      {/* Language Switcher */}
      <motion.div
        className="absolute top-6 right-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={() => setShowLangMenu(!showLangMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe className="w-5 h-5 text-white" />
          <span className="text-white font-medium">{languageNames[lang]}</span>
        </motion.button>

        {showLangMenu && (
          <motion.div
            className="absolute top-full right-0 mt-2 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl min-w-[160px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {availableLanguages.map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l);
                  setShowLangMenu(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                  lang === l ? "text-pink-300" : "text-white/80"
                }`}
              >
                <span>{languageNames[l]}</span>
                {lang === l && <Check className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>

      <div className="relative z-10 w-full max-w-md">
        {/* Pet Guide */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="mb-4 relative inline-block"
            animate={{
              y: [0, -10, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-1 shadow-2xl shadow-pink-500/30">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-5xl">{getPetEmoji()}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Speech bubble */}
          <motion.div
            className="bg-white rounded-2xl px-4 py-3 shadow-xl max-w-xs mx-auto"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={petMessage}
          >
            <p className="text-slate-800 text-sm font-medium">{petMessage}</p>
          </motion.div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-1"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                <KeyRound className="w-8 h-8 text-pink-400" />
              </div>
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">找回密码</h1>
            <p className="text-purple-200/60 text-sm">
              {step === 1 && "输入您的注册邮箱"}
              {step === 2 && "输入收到的验证码"}
              {step === 3 && "设置新的密码"}
              {step === 4 && "密码重置成功"}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-2 rounded-full transition-all ${
                  s <= step ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Step 1: Enter email */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm text-purple-200/80 mb-2">邮箱地址</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                    placeholder="请输入注册邮箱"
                    className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-purple-200/40 focus:outline-none focus:ring-2 transition-all ${
                      emailError ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20"
                    }`}
                  />
                  {email && !emailError && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                  )}
                  {emailError && (
                    <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                  )}
                </div>
                {emailError && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {emailError}
                  </p>
                )}
              </div>

              <motion.button
                onClick={handleSendCode}
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                发送验证码
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Enter verification code */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              <div className="text-center mb-4">
                <p className="text-purple-200/60 text-sm">
                  验证码已发送至 <span className="text-white font-medium">{email}</span>
                </p>
                <p className="text-purple-200/40 text-xs mt-1">
                  （演示模式：验证码显示在宠物提示中）
                </p>
              </div>

              <div>
                <label className="block text-sm text-purple-200/80 mb-2">验证码</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setCodeError("");
                    }}
                    placeholder="请输入6位验证码"
                    maxLength={6}
                    className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-purple-200/40 focus:outline-none focus:ring-2 transition-all text-center text-xl tracking-widest ${
                      codeError ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20"
                    }`}
                  />
                </div>
                {codeError && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {codeError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-purple-200/60 text-sm">
                  {countdown > 0 ? `${countdown}秒后可重新发送` : "可以重新发送"}
                </p>
                <button
                  onClick={handleResendCode}
                  disabled={!canResend}
                  className={`text-sm font-medium transition-colors ${
                    canResend ? "text-pink-400 hover:text-pink-300" : "text-purple-200/40 cursor-not-allowed"
                  }`}
                >
                  重新发送
                </button>
              </div>

              <motion.button
                onClick={handleVerifyCode}
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                验证
              </motion.button>
            </motion.div>
          )}

          {/* Step 3: Reset password */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm text-purple-200/80 mb-2">新密码</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    placeholder="请输入新密码"
                    className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-purple-200/40 focus:outline-none focus:ring-2 transition-all ${
                      passwordError ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password strength indicator */}
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor()} transition-all duration-300`}
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                      <span className="text-xs text-purple-200/60">{getStrengthText()}</span>
                    </div>
                    <p className="text-purple-200/50 text-xs">
                      密码要求：至少8位，包含大小写字母和数字
                    </p>
                  </div>
                )}
                
                {passwordError && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {passwordError}
                  </p>
                )}
              </div>

              <motion.button
                onClick={handleResetPassword}
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                重置密码
              </motion.button>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <div>
                <h2 className="text-xl font-bold text-white mb-2">密码重置成功！</h2>
                <p className="text-purple-200/60 text-sm">
                  您的密码已成功重置，现在可以使用新密码登录了
                </p>
              </div>

              <motion.button
                onClick={handleBackToLogin}
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                返回登录
              </motion.button>
            </motion.div>
          )}

          {/* Tips */}
          <motion.div
            className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium mb-1">温馨提示</p>
                <p className="text-purple-200/60 text-xs">
                  {step === 1 && "请输入您注册时使用的邮箱地址"}
                  {step === 2 && "验证码有效期为60秒，请及时输入"}
                  {step === 3 && "新密码需要符合安全要求，建议包含特殊字符"}
                  {step === 4 && "请妥善保管您的密码，避免再次遗忘"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="mt-6 flex justify-center gap-4">
          <motion.div
            className="w-2 h-2 rounded-full bg-purple-500"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-pink-500"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-cyan-500"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;