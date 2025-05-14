<script>
    import { toast } from "svelte-french-toast";
    import { login } from "../../utils/auth";
    import { navigate } from "svelte-routing";
    import { Button } from "flowbite-svelte";
    const {} = $props();
  
  
    let email = $state("aa@aa.dk");
  
    let password = $state("!QAZ2wsx");
  
  
    
    
  
  
    async function logIn(event) {
      event.preventDefault(); // sørger for at siden ikke reloades grundet form-element
      if (!email && !password) {
        toast.error("All fields must be filled out");
        return;
      }
      if (!email) {
        toast.error("Please enter your email");
        return;
      }
      if (!password) {
        toast.error("Please enter your password");
        return;
      }
  
      const result = await login(email, password);
  
      if (result.status === 200) {
        email = "";
        password = "";
        toast.success("Welcome " + result.data.nickname);
        navigate("/", { replace: true })
      
  
      } else if (result.status === 401) {
        toast.error("Wrong email or password");
        password = "";
      } else {
        toast.error("Something went wrong");
        password = "";
      }
    }
  </script>



<form onsubmit={logIn} class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
  <!-- //type="email" -->  <input bind:value={email}  id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..." required /> 
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input bind:value={password} type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password..." required />
  </div>
  
  <Button type="submit"  color="light" >Login</Button>

</form>




  
 
  
  
  
    
  
  
  <style>
    
  
  </style>
  