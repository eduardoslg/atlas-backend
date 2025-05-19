import { Recipient, EmailParams, Sender, MailerSend } from 'mailersend'

import { env } from '@/env'

// interface SendForgotPasswordMailData {
//   name: string
//   email: string
//   token: string
// }

// interface SendVerificationCodeMailData {
//   name: string
//   email: string
//   code: string
// }

interface SendCreatedUserMailData {
  name: string
  email: string
  password: string
}

interface SendMailData {
  subject: string
  name: string
  body: string
  email: string
}

export const mail = {
  async sendMail({ subject, name, body, email }: SendMailData) {
    // const data = {
    //   app_id: 'a97de9a2-50d1-49de-998f-e45b175743f5',
    //   email_subject: subject,
    //   email_body: body,
    //   include_email_tokens: emails,
    //   from_name: 'zysoft',
    // }

    // await axios.post('https://onesignal.com/api/v1/notifications', data, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Basic os_v2_app_vf66tisq2fe55gmp4rnrov2d6u62f6vb3h7ukhn7jmhfk7tx72y2abcxxiy5jhjvtue7npnjixkc6tdevhkynxyhcvmwgbqmv6eo3mi`,
    //   },
    // })

    const mailerSend = new MailerSend({
      apiKey: env.MAILER_API_KEY,
    })

    const sentFrom = new Sender('email@zysoft.com.br', 'Zysoft')

    const recipients = [new Recipient(email, name)]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(subject)
      .setHtml(body)
      .setText('This is the text content')

    await mailerSend.email.send(emailParams)

    return true
  },

  // async sendForgotPasswordMail({
  //   name,
  //   email,
  //   token,
  // }: SendForgotPasswordMailData) {
  //   await rabbit.publish('microservice_email', {
  //     to: email,
  //     subject: 'Recuperação de senha',
  //     body: `
  //       <!DOCTYPE html>
  //       <html lang="en">
  //         <head>
  //           <meta charset="UTF-8">
  //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //           <title>Recuperação de conta</title>
  //         </head>

  //         <body>
  //           <table role="presentation" border="0" cellspacing="0" align="center" style="font-family: sans-serif; font-size: 16px; line-height: 24px; width: 100%; max-width: 640px; padding: 64px 0; color: #09090B;">
  //             <tbody border="0" cellspacing="0">
  //               <tr>
  //                 <td>
  //                 <strong style="font-size: 24px; line-height: 36px; font-weight: 700;">Projeto Colo de Maria</strong>
  //                 </td>
  //               </tr>

  //               <tr>
  //                 <td colspan="2">
  //                   <h1 style="margin: 48px 0 0; font-size: 30px; line-height: 36px;">Recuperação de conta</h1>
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td colspan="2">
  //                   <p style="margin: 32px 0 0;">Olá, ${name}.</p>
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td colspan="2">
  //                   <p style="margin: 8px 0 0;">Uma solicitação de recuperação de senha foi realizada para sua conta (${email}).</p>
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td colspan="2">
  //                   <p style="margin: 8px 0 32px;">Para continuar com a recuperação de senha clique no botão abaixo para criar uma nova senha.</p>
  //                 </td>
  //               </tr>

  //               <tr>
  //                 <td colspan="2">
  //                   <table align="center" style="height: 48px;">
  //                     <tbody>
  //                       <tr>
  //                         <td>
  //                           <a href="${env.FRONTEND_URL}/reset-password?token=${token}" target="_blank" style="line-height: 16px; height: 48px; padding: 16px 32px; background-color: black; color: white; font-weight: 500; text-decoration: none; border-radius: 8px;">Criar nova senha</a>
  //                         </td>
  //                       </tr>
  //                     </tbody>
  //                   </table>
  //                 </td>
  //               </tr>

  //               <tr>
  //                 <td colspan="2">
  //                   <p style="margin: 32px 0 48px; font-size: 14px; line-height: 20px; color: #71717a;">Se você não solicitou este e-mail, não há nada com que se preocupar – você pode ignorá-lo com segurança.</p>
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </body>
  //       </html>
  //     `,
  //   })
  // },

  // async sendVerificationCodeMail({
  //   name,
  //   email,
  //   code,
  // }: SendVerificationCodeMailData) {
  //   await rabbit.publish('microservice_email', {
  //     to: email,
  //     subject: 'Código de verificação',
  //     body: `
  //       <!DOCTYPE html>
  //       <html lang="en">
  //         <head>
  //           <meta charset="UTF-8">
  //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //           <title>Recuperação de conta</title>
  //         </head>

  //         <body>
  //           <table role="presentation" border="0" cellspacing="0" align="center" style="font-family: sans-serif; font-size: 16px; line-height: 24px; width: 100%; max-width: 640px; padding: 64px 0; color: #09090B;">
  //             <tbody border="0" cellspacing="0">
  //               <tr>
  //                 <td>
  //                 <strong style="font-size: 24px; line-height: 36px; font-weight: 700;">EVs</strong>
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td colspan="2">
  //                   <h1 style="margin: 48px 0 0; font-size: 30px; line-height: 36px;">Confirme seu email</h1>
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td colspan="2">
  //                   <p style="margin: 32px 0 0;">Olá, ${name}.</p>
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td colspan="2">
  //                   <p style="margin: 8px 0 32px;">Recebemos uma solicitação de segurança da sua conta ATM EVs. Use o código abaixo para confirmar o acesso à sua conta.</p>
  //                 </td>
  //               </tr>

  //               <tr style="background-color: #F4F4F5;">
  //                 <td colspan="2">
  //                   <table align="center" style="height: 100px;">
  //                     <tbody>
  //                       <tr>
  //                         <td>
  //                           <span style="font-size: 30px; line-height: 30px; color: #3f3f46;">${code}</span>
  //                         </td>
  //                       </tr>
  //                     </tbody>
  //                   </table>
  //                 </td>
  //               </tr>

  //               <tr>
  //                 <td colspan="2">
  //                   <p style="margin: 32px 0 48px; font-size: 14px; line-height: 20px; color: #71717a;">Se você não solicitou este e-mail, não há nada com que se preocupar – você pode ignorá-lo com segurança.</p>
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </body>
  //       </html>
  //     `,
  //   })
  // },

  createdUserBody({ name, email, password }: SendCreatedUserMailData) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Recuperação de conta</title>
        </head>
        <body>
          <div style="background: #F6F9FC;">
            <table role="presentation" border="0" cellspacing="0" align="center" style="font-family: sans-serif; font-size: 16px; line-height: 24px; width: 100%; max-width: 640px; padding: 64px 0; color: #09090B;">
              <tbody border="0" cellspacing="0" style="gap: 16px; background: #FFF; height: 360px; border-radius: 8px; padding: 16px;">
                <tr>
                  <td>
                  <strong style="font-size: 24px; line-height: 36px; font-weight: 700; padding: 16px 16px 0 16px;">ZySoft</strong>
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p style="margin: 0px; padding: 0px 16px 0 16px;">Olá ${name}, uma conta com este email foi cadastrada em nosso sistema, clique no botão abaixo e utilize os seguintes dados para entrar:</p>
                  </td>
                </tr>

                <tr style="display: block;">
                  <td style="display: flex;">
                    <p style="margin: 0px; padding: 0px 16px 0 16px; font-weight: 700; font-size: 14px;">Email: ${email}</p>
                  </td>
                </tr>

                <tr style="display: block;">
                  <td style="display: flex;">
                    <p style="margin: 0px; padding: 0px 16px 0 16px; font-weight: 700; font-size: 14px;">Senha: ${password}</p>
                  </td>
                </tr>

                <tr>
                  <td colspan="2" style="padding-left: 16px;">
                    <button style="align-items: center; justify-content: center; cursor: pointer; font-weight: 700; color: #FFF; height: 32px; padding: 0 16px; border: none; border-radius: 6px; transition: 0.4s; line-height: 1.3rem; background: #3E63DD; ">
                      <a href="${env.FRONTEND_URL}/sign-in" target="_blank" style="color: #FFF; font-weight: 500; text-decoration: none;">
                        Clique aqui
                      </a>
                    </button>
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p style="margin: 0px 0 48px; font-size: 14px; line-height: 20px; color: #71717a; padding: 0px 16px 0 16px;">Se você não solicitou este e-mail, não há nada com que se preocupar – você pode ignorá-lo com segurança.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `
  },
}
