import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { Controller, useForm } from "react-hook-form";
import { loginFormSchema, LoginFormValues } from "../../../utilities/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../../store/loginSlice";
import { loginFields } from "../../../utilities/fields";
import FormInput from "./FormInput";
import { toast } from "sonner";
import { closeModal } from "../../../store/modalSlice";
import { setSessionId } from "../../../store/userSlice";

const FormLogin = () => {
    const { loading } = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch<AppDispatch>();

    const { control, handleSubmit, formState: {errors, isValid, isSubmitting }} = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange'
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const { payload }  = await dispatch(loginUser(data));
            console.log(payload);
            if (payload.success === false ) {
                toast.error(payload.status_message);
                return
            }
            dispatch(closeModal());
            dispatch(setSessionId({
                session_id: payload
            }))
        } catch (err) {
            console.log(err)
        }
    });
    
    return (
        <>
            <div className=" px-8 py-4 rounded-lg mx-auto w-full">
                <form onSubmit={onSubmit}>
                    {loginFields.map((input) => (
                        <Controller 
                            key={input.name}
                            name={input.name}
                            control={control}
                            defaultValue=""
                            render = {({ field }) => (
                                <FormInput
                                    label={input.label}
                                    type={input.type}
                                    name={input.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors[input.name]?.message}
                                ></FormInput>
                            )}
                        />
                    ))}
                    <button
                        disabled={!isValid || isSubmitting || loading}
                        type="submit"
                        className="disabled:bg-blue-300 disabled:cursor-not-allowed w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        {loading ? 'Loading' : 'Login' }
                    </button>
                </form>
            </div>
        </>
    )
}

export default FormLogin