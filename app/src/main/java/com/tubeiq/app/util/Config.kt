package com.tubeiq.app.util

import com.tubeiq.app.BuildConfig

object Config {
    const val GOOGLE_CLIENT_ID = BuildConfig.GOOGLE_CLIENT_ID
    const val YOUTUBE_API_KEY = BuildConfig.YOUTUBE_API_KEY
    const val ANTHROPIC_API_KEY = BuildConfig.ANTHROPIC_API_KEY
    
    val IS_CONFIG_COMPLETE: Boolean
        get() = YOUTUBE_API_KEY.isNotEmpty() && ANTHROPIC_API_KEY.isNotEmpty()
}
