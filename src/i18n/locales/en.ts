export default {
  app: {
    title: 'XLSTRICKS - Unprotect Excel Spreadsheets',
    subtitle: 'Unprotect old Excel spreadsheets by removing cell and sheet passwords',
    footer: {
      privacy: '100% browser code • Privacy guaranteed',
      local: 'Your file never leaves your device',
    },
  },

  mode: {
    zip: 'ZIP Mode (Fast)',
    recovery: 'Recovery Mode (Advanced)',
    zipDescription: 'Removes cell and sheet protection',
    recoveryDescription: 'Recovers file open password',
  },

  uploader: {
    title: 'Drag your .xlsx file here',
    subtitle: 'or click to select',
    dragging: 'Drop file here',
    processing: 'Processing...',
  },

  status: {
    processing: 'Processing...',
    removingProtection: 'Removing spreadsheet protections',
    crackingPassword: 'Attempting to recover password',
    success: 'Success!',
    downloadStarted: 'Download started',
    passwordFound: 'Password found: {{password}}',
    error: 'Error',
    errorGeneric: 'Could not process file',
  },

  howItWorks: {
    title: 'How it works',
    zip: {
      items: {
        1: '.xlsx files are renamed ZIPs',
        2: 'We remove <sheetProtection/> tags from XML',
        3: 'Everything processed in your browser',
        4: 'File never leaves your computer',
      },
    },
    recovery: {
      items: {
        1: 'Extract password hash from .xlsx file',
        2: 'Test 10k most common passwords',
        3: 'Brute force numeric passwords (0000-999999)',
        4: 'Everything in browser with Web Workers',
      },
    },
  },

  limitations: {
    title: 'Limitations',
    zip: {
      items: {
        1: 'Only works with .xlsx (Excel 2007+)',
        2: 'Does not remove file open password',
      },
    },
    recovery: {
      items: {
        1: 'May take hours if password not in dictionary',
        2: 'Complex/long passwords are impossible to crack',
      },
    },
  },

  privacy: {
    badge: '100% private • Zero upload • Open source',
  },

  disclaimer: {
    title: 'Ethical and Legal Notice',
    warning: 'Recovery Mode attempts to crack file open passwords using brute force techniques. Use only on personal files.',

    legal: {
      title: 'Legal Requirements',
      ownership: 'This is MY personal file',
      understanding: 'I understand improper use may be illegal',
      responsibility: 'I take full responsibility for using this tool',
    },

    technical: {
      title: 'Technical Information',
      time: 'This process may take from minutes to hours depending on the password',
      local: 'All processing occurs locally in your browser',
      privacy: 'No data is sent to external servers',
    },

    buttons: {
      cancel: 'Cancel',
      proceed: 'I Accept and Proceed',
    },

    validation: {
      allRequired: 'You must accept all terms to continue',
    },
  },

  recovery: {
    method: {
      title: 'Attack Method',
      dictionary: 'Dictionary (10,000 common passwords)',
      bruteforce: 'Brute Force (0000-999999)',
      hybrid: 'Hybrid (Dictionary + Brute Force)',
    },

    acceleration: {
      title: 'Acceleration',
      webgpu: 'WebGPU (faster, requires support)',
      webassembly: 'WebAssembly (compatible, 3-4x faster)',
    },

    progress: {
      testing: 'Testing',
      speed: 'passwords/second',
      estimated: 'Estimated time',
      cancel: 'Cancel',
      found: 'Password found',
      notFound: 'Password not found in dictionary/range',
    },
  },

  errors: {
    invalidType: 'Only .xlsx files are supported',
    fileTooLarge: 'File too large (maximum 50MB)',
    notEncrypted: 'This file does not have a file open password',
    webgpuNotSupported: 'WebGPU not supported in this browser. Use WebAssembly.',
    processingError: 'Error processing file',
  },

  aria: {
    uploadZone: 'File upload area',
    closeNotification: 'Close notification',
    fileInput: 'Select Excel file',
    logo: 'XLSTRICKS Logo',
    languageToggle: 'Toggle language',
    modeToggle: 'Toggle mode',
  },
};
