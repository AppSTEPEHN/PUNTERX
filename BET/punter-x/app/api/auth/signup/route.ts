import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, username, password, firstName, lastName } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email or username already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      email,
      username,
      password,
      firstName,
      lastName,
    });

    await user.save();

    // Generate token
    const token = signToken(user._id.toString(), user.role);

    const userResponse = {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    return NextResponse.json(
      {
        message: 'User created successfully',
        token,
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
