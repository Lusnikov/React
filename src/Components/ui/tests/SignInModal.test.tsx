import { fireEvent, render, screen } from "@testing-library/react"
import SignInModal from "../SignInModal"


describe('Тестирование Модального окна входа', () =>{
   test('Кнопка Войти отображается', () =>{
      render(<SignInModal 
         onClose={() => {}}
         callback={() =>{}}
      />);
      expect(screen.getByTestId('sign-in-btn')).toBeInTheDocument()
   })
   test('Кнопка К регистрации отображается', () =>{
      render(<SignInModal 
         onClose={() => {}}
         callback={() =>{}}
      />);
      expect(screen.getByTestId('toRegistration')).toBeInTheDocument()
   })
   test('Отправка формы с пустыми данными', () =>{
      render(<SignInModal 
         onClose={() => {}}
         callback={() =>{}}
      />);
      const sendDataBtn = screen.getByTestId('sign-in-btn');
      fireEvent.click(sendDataBtn)
      expect(screen.getByTestId('email-error')).toBeInTheDocument()
      expect(screen.getByTestId('toRegistration')).toBeInTheDocument()      
   })
   test('Отправка формы с заполненным логином', () =>{
      render(<SignInModal 
         onClose={() => {}}
         callback={() =>{}}
      />);
      const sendDataBtn = screen.getByTestId('sign-in-btn');
      const loginInput = screen.getByTestId("inputEmail") as HTMLInputElement
      const password = screen.getByTestId("inputPassword")

      expect(password).toBeInTheDocument()
      expect(loginInput).toBeInTheDocument()

      fireEvent.change(loginInput,{ target: {value: 'test@mail.ru'}})
      fireEvent.click(sendDataBtn)

      
      expect(screen.queryByTestId('email-error')).not.toBeInTheDocument()
      expect(screen.getByTestId('password-error')).toBeInTheDocument()
      
      
   })

   test('Валидация email на ввод цифр', () =>{
      render(<SignInModal 
         onClose={() => {}}
         callback={() =>{}}
      />);
      const sendDataBtn = screen.getByTestId('sign-in-btn');
      const loginInput = screen.getByTestId("inputEmail") as HTMLInputElement
      fireEvent.change(loginInput,{ target: {value: '12313123131231'}})  
      fireEvent.click(sendDataBtn)
      expect(screen.getByTestId('email-error')).toBeInTheDocument()
   })
   test('Email имеет большое количество символов', () =>{
      render(<SignInModal 
         onClose={() => {}}
         callback={() =>{}}
      />);
      const bigValue = `mailsfsd123123123123123123sdfklajslakfjsklafjfmailsfsd123123123123123123sdfklajslakfjsklafjf@mail.ru`
      const sendDataBtn = screen.getByTestId('sign-in-btn');
      const loginInput = screen.getByTestId("inputEmail") as HTMLInputElement
      fireEvent.change(loginInput,{ target: {value: bigValue}})  
      fireEvent.click(sendDataBtn)
      expect(screen.getByTestId('email-error')).toBeInTheDocument()
   })
})

export {}