import { GraphQLError } from "graphql";

export class ErrorHandler extends GraphQLError {
  public override message: string;
  public status?: number;
  public constructor(message: any, status?: number) {
    super(message);
    this.message = message;
    this.status = status ? status : 500;
  }
}

interface MessageAttr {
  name: string;
  message: string;
  status: number;
  errors: { message: string }[];
  extensions: {
    code: string;
    exception: {
      status: number;
    };
  };
}

export function errorMiddleware(error: ErrorHandler) {
  let reponseError: {
    message: string;
    status: number;
    originalError: ErrorHandler | null;
  } = {
    message: error.message,
    status: error.status || 500,
    originalError: error,
  };

  if (typeof error.message !== "string") {
    const er: MessageAttr = error.message;

    if (er.name === "SequelizeUniqueConstraintError") {
      reponseError.message = er.errors[0].message;
    } else {
      reponseError.message = er.message;
    }

    if (process.env.NODE_ENV === "production") {
      const msg =
        reponseError.message || "Unable to complete request. Please try again";
      reponseError = { message: msg, status: 500, originalError: null };
    }
  }

  return reponseError;
}
