<template>
    <div class="container p-10 pt-20 font-serif text-pretty max-h-fit leading-6 pb-20 bg-gray-200" id="termsService">
    <h1 class="font-serif text-3xl border-b-black border-b-2 mb-2 font-semibold">Terms of Service</h1>
    <h2 class="">Introduction</h2>
    <h3 class="ms-0 text-justify mb-2">Welcome to <strong>FR-Chat!</strong> By using our services, you agree to these terms. Please read them carefully.</h3>
    <h2>1. Data Privacy</h2>
    <p>We respect your privacy. We will <strong>never use</strong> your data for any purpose other than providing our services to you.</p>
  
    <h2>2. Chat Message Encryption</h2>
    <p>All chat messages are end-to-end encrypted. Your conversations are safe and private.</p>
  
    <h2>3. User Conduct</h2>
    <p>You agree not to post any illegal content, including but not limited to hate speech, harassment, or anything that violates local, national, or international laws. We reserve the right to remove any content that violates these terms.</p>
  
    <h2>4. Security</h2>
    <p>We use advanced security measures to protect your data. However, we cannot guarantee absolute security and urge you to use strong, unique passwords for your account.</p>
  
    <h2>5. Changes to Terms</h2>
    <p>We may update these terms from time to time. Continued use of our services means you accept any changes.</p>
  
    <h2>6. Contact Us</h2>
    <p>If you have any questions or concerns about these terms, please contact us at Maroon Labkom Pakuan University</p>
    <h3 class="text-justify ms-0">By using our services, you agree to these terms. Thank you for choosing Your Social Media <strong>FR-Chat!</strong></h3>
    <div class="w-full flex justify-center py-4">
      <button class="px-10 shadow-sm py-2 hover:bg-blue-700 bg-blue-600 text-white rounded-sm active:scale-75 duration-150" @click.once="emit('closeTos')">I agree.</button>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['closeTos']);
</script>