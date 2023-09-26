import * as dayjs from "dayjs";
import { join } from "path";
import { readdir, appendFile, existsSync, mkdirSync, unlink } from "fs";

export class Logs {
	days: number;
	logs: string;
	calls: string;
	errors: string;
	current: string;

	constructor() {
		this.days = 3;
		const [path] = __dirname.split("node_modules");
		this.logs = join(path, "../logs");
		this.calls = join(path, "../logs/calls");
		this.errors = join(path, "../logs/errors");

		if (!existsSync(this.logs)) mkdirSync(this.logs);
		if (!existsSync(this.calls)) mkdirSync(this.calls);
		if (!existsSync(this.errors)) mkdirSync(this.errors);
	}

	write = (type, data) => {
		const date = dayjs().format("DD-MM-YYYY HH:mm");
		let text = `--------------------------\nExecute: ${date} \n--------------------------\n\t`;
		text += `${data}\n\n`;
		appendFile(`${type}/${this.current}.log`, text, error => {
			if (!error) return;
			console.error(`Error saving log "${type}"`);
			console.error(error.stack);
		});
	};

	validateData = (folder, files) => {
		files.forEach(file => {
			const currentMoment = dayjs();
			const fileName = file.split(".")[0];
			const fileMoment = dayjs(fileName, "DD-MM-YYYY");

			const diff = currentMoment.diff(fileMoment, "days");
			if (diff >= this.days) {
				unlink(`${folder}/${file}`, () => {
					//    Clean old log files
				});
			}
		});
	};

	validate = () => {
		this.current = dayjs().format("DD-MM-YYYY");
		readdir(this.calls, (error, files) => {
			if (error) console.error(error);
			else this.validateData(this.calls, files);
		});
		readdir(this.errors, (error, files) => {
			if (error) console.error(error);
			else this.validateData(this.errors, files);
		});
	};

	call = data => this.write(this.calls, data);

	error = data => this.write(this.errors, data);
}
