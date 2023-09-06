// import supabase from '../../lib/utils/supabaseClient';

// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//       return res.status(405).end();
//     }

//     const { user } = await supabase.auth.getSession();

//     if (!user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // Generate company summary here

//     // Save to Supabase storage and database
//   }
