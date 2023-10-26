// import { useForm } from 'react-hook-form';
// import { speakerSchema } from '@/lib/validations/speaker';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Label } from '@radix-ui/react-label';
// import { Input } from '../ui/input';
// import { cn } from '@/lib/utils';
// import { buttonVariants } from '../ui/button';
// import { FormEvent, useState } from 'react';
// import { Textarea } from '../ui/textarea';

// export function EventSpeakerModal() {
//   const [name, setName] = useState('');
//   const [bio, setBio] = useState('');
//   const [photo, setPhoto] = useState('');
//   const handleSubmit = () => {
//     onSave({ name, bio, photo });
//     onClose();
//   };
//   if (!isOpen) {
//     return null;
//   }
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center outline-8">
//       {/* Background overlay with blur */}
//       <div className="fixed inset-0 bg-black/50" />

//       {/* Modal dialog */}
//       <div className=" relative z-50 w-[80%] rounded-lg bg-white p-4 sm:w-[60%] md:w-[40%] lg:w-[30%]">
//         <div className="grid gap-2">
//           <div className="grid gap-2">
//             <Label className="sr-only" htmlFor="name">
//               Name
//             </Label>
//             <Input
//               id="name"
//               placeholder="John Doe"
//               type="name"
//               autoCapitalize="none"
//               autoComplete="name"
//               autoCorrect="off"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <Label className="sr-only" htmlFor="bio">
//               bio
//             </Label>
//             <Textarea
//               id="bio"
//               placeholder="Writ`e about the speaker"
//               autoCapitalize="none"
//               autoComplete="bio"
//               autoCorrect="off"
//               value={bio}
//               className="min-h-[150px] p-4 md:min-h-[200px]"
//               onChange={(e) => setBio(e.target.value)}
//             />
//           </div>
//           <div className="flex justify-center gap-3">
//             <button className={cn(buttonVariants())} onClick={() => handleSubmit()}>
//               Add
//             </button>
//             <button className={cn(buttonVariants())} onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
