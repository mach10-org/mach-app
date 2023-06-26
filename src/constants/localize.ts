export const locales = {
  notifications: {
    newsletter: {
      title: 'Newsletter',
      email_saved: `Your email has been saved !`,
      not_valid_email: 'The email address is not valid'
    },
    auth: {
      title: 'Login',
      magic_link_sent: 'An email should arrive in your inbox shortly !'
    },
    quizz: {
      title: 'Quizz',
      no_profile_text: (arg1: string | number) => `This would get you +${arg1}XP`,
      signup_text1: `Signup to track`,
      signup_text2: `your progress over time, it’s free`,
      success: (arg1: string | number) => `Great! You have now ${arg1}XP`
    },
    profile: {
      title: 'Profile',
      profile_saved: 'Your profile has been saved'
    },
    user: {
      title: 'Mach10 team',
      welcome_back: (arg1: string) => `Welcome back ${arg1}!`,
      welcome_back_url: (arg1: string, arg2: string) => `Pick up where you left off!<br>${arg2}: "${arg1}"`,
      ok: 'Sure',
      cancel: 'Not now'
    }
  },

  menu: [
    {
      label: 'Home',
      link: ''
    },
    {
      label: 'Mission',
      link: 'mission/'
    },
    {
      label: 'Roadmap',
      link: 'roadmap/'
    },
    {
      label: 'Courses',
      link: 'courses/'
    },
    {
      label: 'Is it for me?',
      link: 'who-for/'
    },
    {
      label: 'Free?',
      link: 'why-free/'
    }
  ],
  header: {
    login: 'Login',
    journey: 'Journey',
    profile: 'profile',
    signout: 'Sign out'
  },
  footer: {
    tagLine: ` - made with ❤️ and plenty of 🍵 in 🗾🇯🇵`,
    menu_title_1: `RESOURCES`,
    menu_title_2: `FOLLOW US`,
    menu_title_3: `LEGAL`,
    menu_1: [
      {
        label: 'Manifesto',
        link: 'manifesto/',
        external: false
      },
      {
        label: 'Code of conduct',
        link: 'code-conduct/',
        external: false
      },
      {
        label: 'Get in touch',
        link: 'contact/',
        external: false
      }
    ],
    menu_2: [
      {
        label: 'Instagram',
        link: 'https://github.com/themesberg/flowbite',
        external: true
      },
      {
        label: 'Twitter',
        link: 'https://github.com/themesberg/flowbite',
        external: true
      }
    ],
    menu_3: [
      {
        label: 'Privacy Policy',
        link: 'privacy-policy/',
        external: false
      },
      {
        label: 'Terms & Conditions',
        link: 'terms-and-conditions/',
        external: false
      },
      {
        label: 'Licence',
        link: 'licence/',
        external: false
      }
    ]
  },

  compiler: {
    run: 'Run',
    running: 'Compiling',
    format: 'Format',
    formating: 'Reformatting',
    eval: '⏳ Evaluating output...'
  },

  pages: {
    onboarding: {
      title: 'Welcome to Mach10',
      description: 'Welcome to Mach10',
      form_1_label: 'Your firstname',
      form_1_label_1: '(how should we call you?)',
      form_1_placeholder: 'Firstname',
      form_2: (arg1: string | null) => `Nice to meet you, ${arg1} !`,
      form_3_label: `What is your main goal with this website?`,
      form_3_list: ['Get my first job', 'Change career', 'Just for fun or curiosity', 'Increase my skills', 'Another goal'],
      form_3_help: 'Remember, learning is often challenging, but some of the most worthwhile things in life are. Consistency can take you to anywhere you want.',
      form_4_label: `How would you rate your computer skills?`,
      form_4_list: ['Never used it', 'I know how to use a computer but never did technical work', 'I have already programming experience'],
      form_5_label: `What kind of devices do you own?`,
      form_5_list: ['iPad', 'Other tablet', 'Mac', 'Windows computer', 'Other', 'None of these'],
      form_6_label: `What's your age?`,
      form_6_list: ['13 - 18', '19 – 24', '25 – 34', '35 – 44', 'More than 45', 'It’s a secret!'],
      form_7: 'Perfect! We’re here to help you every step of your journey. Let’s get started!',
      why_title: 'Why we ask',
      why_text_1:
        'We would like to ask you a few question in order to know our audience better and create the most relevant experience for you. Knowing who is using our content makes us better at crafting the best possible content.',
      why_text_2: 'These answers are optional and you are completely free not to answer anything, we get it',
      why_btn: 'Why we ask'
    },
    profile: {
      intro: `We’d love to learn more about you. Could you share with us what is your main goal applying here? Even if it’s just curiosity, we’re interested to hear ☺.`,
      intro_2: `This is also helping us to know our audience and adapt our content accordingly.`,
      education_label: `Education level`,
      education_list: ['Primary education', 'Secondary education', 'High education', 'Master’s'],
      gender_label: `Gender`,
      gender_list: ['Male', 'Female', 'Other'],
      comment_label: `Could you tell us more about you and your objectives?`,
      comment_placeholder: `Write your thoughts here...`
    },
    journey: {
      notEnrolled: `Looks like you didn’t enroll any course yet, how about starting today ?`,
      notEnrolledCTA: `Get started today !`,
      summary_left: 'Courses enrolled',
      summary_right: 'Lessons completed',
      progress_percentTitle: (arg1: string) => `You're <span class="percent">${arg1}%</span> through your enrolled Courses.`,
      progress_percentSubtile: `lessons completed`,
      detail_goToCourse: `Go to course`,
      detail_completed: 'exercises completed',
      detail_lastWeeks: 'Last 14 days',
      detail_dateStart: `When you started the course`
    }
  },

  common: {
    loading: 'Loading ...',
    next: 'Next',
    choose: 'Choose',
    save: 'Save',
    submit: 'Submit',
    xp: 'XP'
  },

  errors: {
    default: `An error has occured ! Please try again later !`,
    code: {
      429: `For security purposes, you can only request this after 60 seconds.`, // asking Magic link login more than once per minute
      23505: `You have already registered this email! We'll be in touch!` // Newsletter register more than once with same email
    }
  }
};

export const erroMsg = (code: number | null = null) => {
  return code ? locales.errors.code?.[code] || locales.errors.default : locales.errors.default;
};
