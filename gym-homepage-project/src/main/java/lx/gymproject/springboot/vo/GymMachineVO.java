package lx.gymproject.springboot.vo;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GymMachineVO {
	public int machineId;
	
	public String machineName;
	
	public LocalDate machinePurchaseDate;

	public double machinePrice;

	public String machineImg;
	
	public MultipartFile file;

}

