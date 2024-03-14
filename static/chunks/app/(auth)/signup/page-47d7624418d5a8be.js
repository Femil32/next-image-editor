(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[129],{6751:function(e,s,a){Promise.resolve().then(a.bind(a,9608))},9608:function(e,s,a){"use strict";a.r(s);var r=a(7437),l=a(2265),i=a(3879),n=a(703),t=a(1991),c=a(8792),d=a(7907),o=a(6123);s.default=()=>{let e=(0,d.useRouter)(),[s,a]=(0,l.useState)(!1),{values:m,errors:u,handleSubmit:x,handleChange:h,touched:f,setTouched:p}=(0,i.TA)({initialValues:{user_name:"",email:"",password:"",confirmpassword:""},validationSchema:t.Ry().shape({user_name:t.Z_().min(2,"Last name must be 2 characters or more").required("Last Name is required."),email:t.Z_().email("Email must be a valid email").required("Email is required."),password:t.Z_().required("Password is required.").min(6,"Your password is too short."),confirmpassword:t.Z_().oneOf([t.iH("password")],"Passwords must match").required("Confirm Password is required.")}),onSubmit:(s,a)=>{let{resetForm:r}=a,{user_name:l,email:i,password:n}=s;console.log(s);try{sessionStorage.setItem("user",JSON.stringify({user_name:l,email:i,password:n,isLogin:!1})),o.toast.success("Signup successfully!"),e.push("/login")}catch(e){console.error(e)}}});return(0,l.useEffect)(()=>{p({},!1)},[p,m.role]),(0,r.jsx)("div",{className:"h-screen flex justify-center items-center bg-white",children:(0,r.jsx)("div",{className:"relative flex flex-col text-gray-700 bg-transparent border rounded-xl bg-clip-border shadow-md py-4 px-6",children:(0,r.jsx)("div",{className:"max-w-screen-lg",children:(0,r.jsx)("form",{onSubmit:x,className:"flex",children:(0,r.jsxs)("div",{className:"",children:[(0,r.jsxs)("div",{className:"mb-3 ",children:[(0,r.jsx)("h4",{className:"block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 ",children:"Sign Up"}),(0,r.jsx)("p",{className:"block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700",children:"Nice to meet you! Enter your details to register."})]}),(0,r.jsx)("hr",{}),(0,r.jsxs)("div",{className:"flex flex-col gap-4 mt-4",children:[(0,r.jsx)("div",{className:"".concat(u.user_name&&f.user_name?"border-red-500":""," border max-w-96 rounded-md px-6 py-3"),children:(0,r.jsxs)("div",{className:"flex justify-center items-center gap-2",children:[(0,r.jsx)(n.default,{src:"/assets/icons/user.svg",alt:"search",width:28,height:28}),(0,r.jsx)("div",{className:"border-l-2 h-11"}),(0,r.jsxs)("div",{className:"flex justify-start flex-col gap-1 flex-1",children:[(0,r.jsx)("label",{className:"cursor-pointer",children:"User name"}),(0,r.jsx)("input",{id:"user_name",name:"user_name",type:"text",className:"outline-none",placeholder:"Enter your e-mail",value:m.user_name,onChange:h})]})]})}),(0,r.jsx)("div",{className:"".concat(u.email&&f.email?"border-red-500":""," border max-w-96 rounded-md px-6 py-3"),children:(0,r.jsxs)("div",{className:"flex justify-center items-center gap-2",children:[(0,r.jsx)(n.default,{src:"/assets/icons/email.svg",alt:"search",width:28,height:28}),(0,r.jsx)("div",{className:"border-l-2 h-11"}),(0,r.jsxs)("div",{className:"flex justify-start flex-col gap-1 flex-1",children:[(0,r.jsx)("label",{className:"cursor-pointer",children:"E-mail*"}),(0,r.jsx)("input",{id:"email",name:"email",type:"email",className:"outline-none",placeholder:"Enter your e-mail",value:m.email,onChange:h})]})]})}),(0,r.jsx)("div",{className:"".concat(u.password&&f.password?"border-red-500":""," border max-w-96 rounded-md px-6 py-3"),children:(0,r.jsxs)("div",{className:"flex justify-center items-center gap-2",children:[(0,r.jsx)(n.default,{src:"/assets/icons/password.svg",alt:"search",width:28,height:28}),(0,r.jsx)("div",{className:"border-l-2 h-11"}),(0,r.jsxs)("div",{className:"flex justify-start flex-col gap-1 flex-1",children:[(0,r.jsx)("label",{className:"cursor-pointer",children:"Password"}),(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("input",{id:"password",name:"password",type:s?"text":"password",className:"outline-none flex-1",placeholder:"Enter your password",value:m.password,onChange:h}),(0,r.jsx)(n.default,{src:s?"/assets/icons/open-eye.svg":"/assets/icons/close-eye.svg",alt:"search",width:28,height:28,onClick:()=>a(!s),className:"cursor-pointer"})]})]})]})}),(0,r.jsx)("div",{className:"".concat(u.confirmpassword&&f.confirmpassword?"border-red-500":""," border max-w-96 rounded-md px-6 py-3"),children:(0,r.jsxs)("div",{className:"flex justify-center items-center gap-2",children:[(0,r.jsx)(n.default,{src:"/assets/icons/password.svg",alt:"search",width:28,height:28}),(0,r.jsx)("div",{className:"border-l-2 h-11"}),(0,r.jsxs)("div",{className:"flex justify-start flex-col gap-1 flex-1",children:[(0,r.jsx)("label",{className:"cursor-pointer",children:"Confirm Password"}),(0,r.jsx)("input",{id:"confirmpassword",name:"confirmpassword",type:"password",className:"outline-none",placeholder:"Enter your Confirm Password",value:m.confirmpassword,onChange:h})]})]})}),(0,r.jsx)("button",{className:"btn btn-primary",children:"Submit"}),(0,r.jsxs)("div",{className:"flex justify-center",children:["Already have account?\xa0",(0,r.jsx)(c.default,{href:"/login",className:"underline",children:"LogIn"})]})]})]})})})})})}}},function(e){e.O(0,[123,884,595,971,69,744],function(){return e(e.s=6751)}),_N_E=e.O()}]);