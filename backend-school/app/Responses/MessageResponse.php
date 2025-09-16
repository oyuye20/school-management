<?php

namespace App\Responses;
class MessageResponse
{
    private $message;
    private $status;
    private $statusCode;


    public function __construct($message, $statusCode, $status)
    {
        $this->message = $message;
        $this->statusCode = $statusCode;
        $this->status = $status;        
    }


    public function message(){
        return response()->json([
                'status' => $this->status,
                'message' => $this->message,
        ], $this->statusCode);
    }

}

?>