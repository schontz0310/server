import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import Appointment from "../infra/typeorm/entities/Appointment";


export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
