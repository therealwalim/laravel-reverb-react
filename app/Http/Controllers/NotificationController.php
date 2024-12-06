<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Http\Requests\UpdateNotificationRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class NotificationController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // get all authenticated user notifications
        $notifications = $request->user()->notifications;
        return response()->json(['notifications' => $notifications]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $entries = $request->validate([
            'title' => 'required|max:100',
            'body' => 'required',
        ]);

        $notification = $request->user()->notifications()->create($entries);

        return ['notification' => $notification];
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Notification $notification)
    {
        $notification = $request->user()->notifications()->find($notification);

        return ['notification' => $notification];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNotificationRequest $request, Notification $notification)
    {
        $entries = $request->validate([
            'title' => 'required|max:100',
            'body' => 'required',
        ]);

        $notification->update($entries);

        return $notification;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        $notification->delete();

        return response()->json(['message' => 'Notification deleted successfully']);
    }
}
