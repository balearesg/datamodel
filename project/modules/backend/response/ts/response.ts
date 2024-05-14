import {IParams} from "@bgroup/data-model/interfaces";
class Response {
	error = (message: string, target: string) => {
		return {
			status: false,
			error: {
				message: message,
				target: target,
			},
		};
	};

	processError = (exc: any | string, target: string) => {
		return this.error(exc.message ? exc.message : exc, target);
	};

	data = (data: IParams) => {
		return {status: true, data};
	};

	list = (data: IParams, total: number, {limit, start}: IParams) => {
		limit = limit ?? 10;
		start = start ?? 0;
		let next: number;
		if (data.length > limit) {
			next = !start ? limit : limit + start;
			data.pop();
		}

		return {
			status: true,
			data: {
				entries: data,
				next,
				total,
			},
		};
	};
	publish = (res: IParams) => {
		return res;
	};

	remove = () => {
		return {status: true};
	};
}

export /*bundle*/
const response = new Response();
