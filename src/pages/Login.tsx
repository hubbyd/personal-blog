import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowLeft, Heart, MessageCircle, Globe, Check, AlertCircle, CheckCircle } from "lucide-react";
import { trackPageView, getMergedStats, trackLogin, trackRegister } from "../utils/visitorTracker";
import { useTranslation } from "../i18n/useTranslation";

function Login() {
  const navigate = useNavigate();
  const { t, lang, setLang, languageNames, availableLanguages } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [petMessage, setPetMessage] = useState("");
  const [petMood, setPetMood] = useState<"happy" | "thinking" | "excited" | "sleepy">("happy");
  const [visitorStats, setVisitorStats] = useState<{ views: number; visitors: number; logins: number; registeredUsers: number }>({ views: 0, visitors: 0, logins: 0, registeredUsers: 0 });
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  // Validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    // Standard email regex pattern (similar to major platforms)
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
    
    // Calculate password strength
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 20; // lowercase
    if (/[A-Z]/.test(password)) strength += 20; // uppercase
    if (/[0-9]/.test(password)) strength += 15; // numbers
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10; // special chars
    setPasswordStrength(Math.min(strength, 100));

    // Validation rules (similar to ChatGPT/WeChat)
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

  const validateUsername = (username: string): boolean => {
    if (!username) {
      setUsernameError("");
      return false;
    }
    if (username.length < 2) {
      setUsernameError("用户名至少需要2个字符");
      return false;
    }
    if (username.length > 20) {
      setUsernameError("用户名不能超过20个字符");
      return false;
    }
    if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(username)) {
      setUsernameError("用户名只能包含字母、数字、下划线或中文");
      return false;
    }
    setUsernameError("");
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

  const petMessages = {
    login: {
      happy: "Welcome back! Ready to explore?",
      thinking: "Hmm, let me check your credentials...",
      excited: "Yay! You're back! I missed you!",
      sleepy: "Take your time, no rush~",
    },
    register: {
      happy: "New friend! Let's create your account!",
      thinking: "Choosing a cool username is important!",
      excited: "Welcome to the community!",
      sleepy: "Passwords can be tricky, I understand~",
    },
    default: {
      happy: "Hi there! I'm your guide today!",
      thinking: "Hmm, what should we do next?",
      excited: "Woof woof! This is exciting!",
      sleepy: "*yawn* Nice to meet you!",
    },
  };

  useEffect(() => {
    trackPageView();
    loadStats();
  }, []);

  const loadStats = async () => {
    const stats = await getMergedStats();
    setVisitorStats(stats);
  };

  useEffect(() => {
    const messages = isLogin ? petMessages.login : petMessages.register;
    const keys = Object.keys(messages) as Array<keyof typeof messages>;
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setPetMessage(messages[randomKey]);
    setPetMood(randomKey);
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    const usernameValid = isLogin || validateUsername(username);
    
    if (!emailValid || !passwordValid || !usernameValid) {
      setPetMood("thinking");
      setPetMessage("Please check your input carefully!");
      return;
    }
    
    if (isLogin) {
      await trackLogin();
    } else {
      await trackRegister();
    }
    await loadStats();
    setPetMood("excited");
    setPetMessage(isLogin ? "Welcome back! Enjoy your visit!" : "Account created! Welcome aboard!");
    
    // Navigate to home after login/register
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setPetMood("thinking");
    setPetMessage(isLogin ? "Let's create something new!" : "Back to login? No problem!");
  };

  const getPetEmoji = () => {
    switch (petMood) {
      case "happy": return "(◕‿◕)";
      case "thinking": return "( 🤔 )";
      case "excited": return "( ✧ω✧ )";
      case "sleepy": return "( ∙_∙ )zzZ";
      default: return "(◕‿◕)";
    }
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
        onClick={() => navigate("/")}
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

      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center gap-8">
        {/* Pet Guide Section */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Pet Character */}
          <motion.div
            className="mb-6 relative inline-block"
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
            <div className="w-40 h-40 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-1 shadow-2xl shadow-pink-500/30">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-6xl">{getPetEmoji()}</span>
              </div>
            </div>
            {/* Speech bubble */}
            <motion.div
              className="absolute top-0 right-0 lg:right-auto lg:left-full lg:ml-4 bg-white rounded-2xl px-4 py-3 shadow-xl max-w-xs"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={petMessage}
            >
              <p className="text-slate-800 text-sm font-medium">{petMessage}</p>
              <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white" />
            </motion.div>
          </motion.div>

          {/* Pet name and info */}
          <h2 className="text-2xl font-bold text-white mb-2">{t.login.petName}</h2>
          <p className="text-purple-200/70 mb-6">{t.login.petDesc}</p>

          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto lg:mx-0">
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <Eye className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-white">{visitorStats.views}</p>
              <p className="text-xs text-purple-200/60">{t.login.views}</p>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <User className="w-5 h-5 text-pink-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-white">{visitorStats.visitors}</p>
              <p className="text-xs text-purple-200/60">{t.login.visitors}</p>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-5 h-5 text-red-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-white">{visitorStats.logins}</p>
              <p className="text-xs text-purple-200/60">{t.login.logins}</p>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-white">{visitorStats.registeredUsers}</p>
              <p className="text-xs text-purple-200/60">{t.login.registered}</p>
            </motion.div>
          </div>

          {/* Tips */}
          <motion.div
            className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium mb-1">{t.login.petTip}</p>
                <p className="text-purple-200/60 text-xs">
                  {t.login.petTipContent}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="flex-1 w-full max-w-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Form header */}
            <div className="text-center mb-8">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-1"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-pink-400" />
                </div>
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {isLogin ? t.login.welcomeBack : t.login.createAccount}
              </h1>
              <p className="text-purple-200/60 text-sm">
                {isLogin ? t.login.loginSubtitle : t.login.registerSubtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm text-purple-200/80 mb-2">{t.login.username}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        validateUsername(e.target.value);
                      }}
                      placeholder={t.login.enterUsername}
                      className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-purple-200/40 focus:outline-none focus:ring-2 transition-all ${
                        usernameError ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20"
                      }`}
                      required={!isLogin}
                    />
                    {username && !usernameError && (
                      <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                    )}
                    {usernameError && (
                      <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                    )}
                  </div>
                  {usernameError && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {usernameError}
                    </p>
                  )}
                </motion.div>
              )}

              <div>
                <label className="block text-sm text-purple-200/80 mb-2">{t.login.email}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                    placeholder={t.login.enterEmail}
                    className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-purple-200/40 focus:outline-none focus:ring-2 transition-all ${
                      emailError ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20"
                    }`}
                    required
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

              <div>
                <label className="block text-sm text-purple-200/80 mb-2">{t.login.password}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    placeholder={t.login.enterPassword}
                    className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-purple-200/40 focus:outline-none focus:ring-2 transition-all ${
                      passwordError ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20"
                    }`}
                    required
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
                {!isLogin && password && (
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

              {isLogin && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-end"
                >
                  <button 
                    type="button" 
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    {t.login.forgotPassword}
                  </button>
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 hover:bg-pos-100 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLogin ? t.login.login : t.login.register}
              </motion.button>
            </form>

            {/* Toggle mode */}
            <div className="mt-6 text-center">
              <p className="text-purple-200/60 text-sm">
                {isLogin ? t.login.noAccount : t.login.haveAccount}{" "}
                <button
                  onClick={toggleMode}
                  className="text-pink-400 hover:text-pink-300 font-medium transition-colors"
                >
                  {isLogin ? t.login.register : t.login.login}
                </button>
              </p>
            </div>
          </div>

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
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
